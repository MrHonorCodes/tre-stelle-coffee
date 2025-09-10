import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-05-01',
    token: process.env.SANITY_API_WRITE_TOKEN!,
    useCdn: false,
});

const ADMIN_SECRET = process.env.ADMIN_API_SECRET;

type OrderItemRef = {
    _key?: string;
    product?: { _type: 'reference'; _ref: string; _weak?: boolean } | null;
    productId?: string;
    productName?: string;
    quantity?: number;
    size?: string | null;
};

export async function POST(req: NextRequest) {
    try {
        // Simple auth: require Authorization: Bearer <ADMIN_API_SECRET>
        if (ADMIN_SECRET) {
            const bearer = req.headers.get('authorization');
            const token = bearer?.split(' ')?.[1];
            if (token !== ADMIN_SECRET) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        }

        // Parse JSON body if provided; otherwise fall back to query params
        let parsedBody: { orderId?: string; sessionId?: string } = {};
        try {
            parsedBody = (await req.json()) as { orderId?: string; sessionId?: string };
        } catch {
            // ignore
        }
        const qp = req.nextUrl?.searchParams;
        const orderIdFromQuery = qp?.get('orderId') || undefined;
        const sessionIdFromQuery = qp?.get('sessionId') || undefined;
        const clearFromQuery = qp?.get('clear') || undefined; // 'true' to clear references

        const { orderId, sessionId } = {
            orderId: parsedBody.orderId || orderIdFromQuery,
            sessionId: parsedBody.sessionId || sessionIdFromQuery,
        };
        const clearFlag = (parsedBody && typeof (parsedBody as Record<string, unknown>).clear === 'boolean'
            ? (parsedBody as Record<string, unknown>).clear === true
            : false) || (clearFromQuery === 'true');

        let targetOrderId = orderId as string | undefined;
        if (!targetOrderId && sessionId) {
            // Lookup order by Stripe session id
            const found = await sanityClient.fetch<{ _id: string } | null>(
                `*[_type == "order" && stripeSessionId == $sid][0]{ _id }`,
                { sid: sessionId }
            );
            targetOrderId = found?._id;
        }

        if (!targetOrderId) {
            return NextResponse.json(
                { message: 'Provide orderId or sessionId in request body or query params.', parsed: { orderId, sessionId } },
                { status: 400 }
            );
        }

        const order = await sanityClient.getDocument<{
            _id: string;
            orderItems?: OrderItemRef[];
        }>(targetOrderId);

        if (!order) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        const updatedItems: OrderItemRef[] = [];
        const unresolved: Array<{ idx: number; reason: string; productId?: string; ref?: string }> = [];

        for (let i = 0; i < (order.orderItems?.length || 0); i += 1) {
            const item = { ...(order.orderItems as OrderItemRef[])[i] };
            if (!item) continue;

            // If clear requested, remove the product reference entirely
            if (clearFlag) {
                item.product = null;
                updatedItems.push(item);
                continue;
            }

            // Case 1: Existing reference points to a draft doc id
            if (item.product && item.product._ref?.startsWith('drafts.')) {
                const publishedId = item.product._ref.replace(/^drafts\./, '');
                // Verify published doc exists
                const exists = await sanityClient.fetch<string | null>(
                    `*[_type == "product" && _id == $pid][0]._id`,
                    { pid: publishedId }
                );
                if (exists) {
                    // Strong reference to the published product
                    item.product = { _type: 'reference', _ref: publishedId };
                } else {
                    // Fallback: make weak to allow publish
                    item.product = { _type: 'reference', _ref: publishedId, _weak: true };
                    unresolved.push({ idx: i, reason: 'Published product not found for draft ref', ref: item.product._ref });
                }
            }

            // Case 2: No reference, try to resolve by productId stored on the line item
            if ((!item.product || !item.product._ref) && item.productId) {
                const resolvedId = await sanityClient.fetch<string | null>(
                    `*[_type == "product" && !(_id in path("drafts.**")) && productId == $pid][0]._id`,
                    { pid: item.productId }
                );
                if (resolvedId) {
                    // Strong reference to the published product resolved by productId
                    item.product = { _type: 'reference', _ref: resolvedId };
                } else {
                    unresolved.push({ idx: i, reason: 'No published product for productId', productId: item.productId });
                }
            }

            updatedItems.push(item);
        }

        // Apply patch to the target doc
        await sanityClient.patch(targetOrderId).set({ orderItems: updatedItems }).commit();

        // Also try to patch the counterpart version (draft <-> published) to keep Studio in sync
        const isDraft = targetOrderId.startsWith('drafts.');
        const counterpartId = isDraft ? targetOrderId.replace(/^drafts\./, '') : `drafts.${targetOrderId}`;
        try {
            const counterpart = await sanityClient.getDocument(counterpartId as string);
            if (counterpart) {
                await sanityClient.patch(counterpartId as string).set({ orderItems: updatedItems }).commit();
            }
        } catch {}

        return NextResponse.json({ message: 'Order references updated', unresolved, cleared: clearFlag }, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        // Simple auth (optional) via ADMIN_API_SECRET on GET too
        if (ADMIN_SECRET) {
            const bearer = req.headers.get('authorization');
            const token = bearer?.split(' ')?.[1];
            if (token !== ADMIN_SECRET) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        }

        const qp = req.nextUrl?.searchParams;
        const orderId = qp?.get('orderId') || undefined;
        const sessionId = qp?.get('sessionId') || undefined;
        const clearFlag = qp?.get('clear') === 'true';

        let targetOrderId = orderId as string | undefined;
        if (!targetOrderId && sessionId) {
            const found = await sanityClient.fetch<{ _id: string } | null>(
                `*[_type == "order" && stripeSessionId == $sid][0]{ _id }`,
                { sid: sessionId }
            );
            targetOrderId = found?._id;
        }

        if (!targetOrderId) {
            return NextResponse.json(
                { message: 'Provide orderId or sessionId as query parameters.', parsed: { orderId, sessionId } },
                { status: 400 }
            );
        }

        // Reuse the same logic as POST by making a shallow internal call would require refactor; duplicating key steps here
        const order = await sanityClient.getDocument<{
            _id: string;
            orderItems?: Array<{ _key?: string; product?: { _type: 'reference'; _ref: string; _weak?: boolean } | null; productId?: string; productName?: string; quantity?: number; size?: string | null; }>;
        }>(targetOrderId);

        if (!order) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        const updatedItems: Array<{ _key?: string; product?: { _type: 'reference'; _ref: string; _weak?: boolean } | null; productId?: string; productName?: string; quantity?: number; size?: string | null; }> = [];
        const unresolved: Array<{ idx: number; reason: string; productId?: string; ref?: string }> = [];

        for (let i = 0; i < (order.orderItems?.length || 0); i += 1) {
            const item = { ...(order.orderItems as NonNullable<typeof order.orderItems>)[i] };
            if (!item) continue;

            if (clearFlag) {
                item.product = null;
                updatedItems.push(item);
                continue;
            }

            if (item.product && item.product._ref?.startsWith('drafts.')) {
                const publishedId = item.product._ref.replace(/^drafts\./, '');
                const exists = await sanityClient.fetch<string | null>(
                    `*[_type == "product" && _id == $pid][0]._id`,
                    { pid: publishedId }
                );
                if (exists) {
                    item.product = { _type: 'reference', _ref: publishedId };
                } else {
                    item.product = { _type: 'reference', _ref: publishedId, _weak: true };
                    unresolved.push({ idx: i, reason: 'Published product not found for draft ref', ref: item.product._ref });
                }
            }

            if ((!item.product || !item.product._ref) && item.productId) {
                const resolvedId = await sanityClient.fetch<string | null>(
                    `*[_type == "product" && !(_id in path("drafts.**")) && productId == $pid][0]._id`,
                    { pid: item.productId }
                );
                if (resolvedId) {
                    item.product = { _type: 'reference', _ref: resolvedId };
                } else {
                    unresolved.push({ idx: i, reason: 'No published product for productId', productId: item.productId });
                }
            }

            updatedItems.push(item);
        }

        await sanityClient.patch(targetOrderId).set({ orderItems: updatedItems }).commit();
        // Patch counterpart as well
        const isDraft = targetOrderId.startsWith('drafts.');
        const counterpartId = isDraft ? targetOrderId.replace(/^drafts\./, '') : `drafts.${targetOrderId}`;
        try {
            const counterpart = await sanityClient.getDocument(counterpartId as string);
            if (counterpart) {
                await sanityClient.patch(counterpartId as string).set({ orderItems: updatedItems }).commit();
            }
        } catch {}
        return NextResponse.json({ message: 'Order references updated', unresolved, cleared: clearFlag }, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ message }, { status: 500 });
    }
}


