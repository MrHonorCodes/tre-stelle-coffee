import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { LRUCache } from 'lru-cache';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiter: 5 submissions per hour per IP
const rateLimiter = new LRUCache<string, { count: number }>({
	max: 5000,
	ttl: 1000 * 60 * 60,
});
const MAX_PER_HOUR = 5;

const TO_ADDRESS = 'contact@trestellecoffeeco.com';

function isValidEmail(value: string): boolean {
	// ReDoS-safe, no backtracking regex
	const atIdx = value.indexOf('@');
	const hasValidAt = atIdx > 0 && atIdx === value.lastIndexOf('@');
	const hasDomainDot = hasValidAt && value.indexOf('.', atIdx + 2) > atIdx + 1;
	return hasValidAt && hasDomainDot && value.length <= 254;
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
	const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
	const entry = rateLimiter.get(ip);
	if (entry) {
		if (entry.count >= MAX_PER_HOUR) {
			return NextResponse.json(
				{ message: 'Too many requests. Please try again later or call us directly.' },
				{ status: 429 }
			);
		}
		entry.count++;
		rateLimiter.set(ip, entry);
	} else {
		rateLimiter.set(ip, { count: 1 });
	}

	if (!process.env.RESEND_API_KEY) {
		console.error('event-inquiry: RESEND_API_KEY not configured');
		return NextResponse.json({ message: 'Email service unavailable' }, { status: 503 });
	}

	try {
		const body = await request.json();
		const { name, email, phone, date, startTime, endTime, message } = body ?? {};

		// Required fields
		if (!name || !email || !phone || !date || !startTime || !endTime) {
			return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
		}

		// Type + length validation
		if (
			typeof name !== 'string' || name.length > 100 ||
			typeof phone !== 'string' || phone.length > 40 ||
			typeof date !== 'string' || date.length > 40 ||
			typeof startTime !== 'string' || startTime.length > 40 ||
			typeof endTime !== 'string' || endTime.length > 40 ||
			(message != null && (typeof message !== 'string' || message.length > 2000))
		) {
			return NextResponse.json({ message: 'One or more fields are invalid.' }, { status: 400 });
		}

		if (typeof email !== 'string' || !isValidEmail(email)) {
			return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
		}

		const safe = {
			name: escapeHtml(name),
			email: escapeHtml(email),
			phone: escapeHtml(phone),
			date: escapeHtml(date),
			startTime: escapeHtml(startTime),
			endTime: escapeHtml(endTime),
			message: message ? escapeHtml(message) : '—',
		};

		const { error } = await resend.emails.send({
			from: 'Tre Stelle Events <contact@trestellecoffeeco.com>',
			to: [TO_ADDRESS],
			replyTo: email,
			subject: `New Event Booking Request — ${safe.name}`,
			html: `
				<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2E1A13; line-height: 1.6;">
					<h2 style="color: #4a0000; margin-bottom: 16px;">New Event Booking Request</h2>
					<table cellpadding="6" style="font-size: 15px;">
						<tr><td style="font-weight:600;">Name:</td><td>${safe.name}</td></tr>
						<tr><td style="font-weight:600;">Email:</td><td>${safe.email}</td></tr>
						<tr><td style="font-weight:600;">Phone:</td><td>${safe.phone}</td></tr>
						<tr><td style="font-weight:600;">Event Date:</td><td>${safe.date}</td></tr>
						<tr><td style="font-weight:600;">Start Time:</td><td>${safe.startTime}</td></tr>
						<tr><td style="font-weight:600;">End Time:</td><td>${safe.endTime}</td></tr>
					</table>
					<p style="font-weight:600; margin: 16px 0 4px;">Event Details:</p>
					<p style="white-space: pre-wrap; background:#f6efe2; padding:12px 16px; border-radius:8px;">${safe.message}</p>
					<p style="font-size: 13px; color: #6b5a54; margin-top: 20px;">Reply directly to this email to reach ${safe.name}.</p>
				</div>
			`,
		});

		if (error) {
			console.error('event-inquiry: Resend error', error);
			return NextResponse.json({ message: 'Failed to send request. Please try again.' }, { status: 502 });
		}

		return NextResponse.json({ message: 'Request sent successfully.' }, { status: 200 });
	} catch (err) {
		console.error('event-inquiry: unexpected error', err);
		return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
	}
}
