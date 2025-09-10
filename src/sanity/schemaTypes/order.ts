import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'order',
	title: 'Order',
	type: 'document',
	fields: [
		defineField({
			name: 'customerEmail',
			title: 'Customer Email',
			type: 'string',
			readOnly: true,
		}),
		defineField({
			name: 'orderItems',
			title: 'Order Items',
			type: 'array',
			of: [
				{
					type: 'object',
					title: 'Order Item',
					fields: [
						{
							name: 'product',
							title: 'Product',
							type: 'reference',
							to: [{ type: 'product' }],
							weak: true,
							readOnly: true,
						},
						{
							name: 'productId',
							title: 'Product ID',
							type: 'string',
							readOnly: true,
						},
						{
							name: 'productName',
							title: 'Product Name',
							type: 'string',
							readOnly: true,
						},
						{
							name: 'quantity',
							title: 'Quantity',
							type: 'number',
							readOnly: true,
						},
						{
							name: 'size',
							title: 'Size',
							type: 'string',
							readOnly: true,
						},
					],
					preview: {
						select: {
							title: 'productName',
							subtitle: 'quantity',
							size: 'size',
							media: 'product.images.0',
						},
						prepare({ title, subtitle, size, media }) {
							return {
								title: title || 'Unknown Product',
								subtitle: `Qty: ${subtitle || 0}${size ? ` • Size: ${size}` : ''}`,
								media: media,
							};
						},
					},
				},
			],
			readOnly: true,
		}),
		defineField({
			name: 'productDetails',
			title: 'Raw Product Details (Legacy)',
			type: 'text',
			readOnly: true,
			hidden: true, // Hide this field since we now have the structured orderItems
		}),
		defineField({
			name: 'stripeSessionId',
			title: 'Stripe Session ID',
			type: 'string',
			readOnly: true,
		}),
		defineField({
			name: 'trackingNumber',
			title: 'Tracking Number',
			type: 'string',
			// Admin will fill this in
		}),
		defineField({
			name: 'trackingEmailSent',
			title: 'Tracking Email Sent',
			type: 'boolean',
			initialValue: false,
			readOnly: true, // This will be updated programmatically
		}),
		defineField({
			name: 'orderTimestamp',
			title: 'Order Timestamp',
			type: 'datetime',
			options: {
				dateFormat: 'YYYY-MM-DD',
				timeFormat: 'HH:mm',
				timeStep: 15,
			},
			readOnly: true,
		}),
		defineField({
			name: 'isArchived',
			title: 'Archived',
			type: 'boolean',
			initialValue: false,
			description: 'Set to true to archive this order.',
			// You might want to control who can edit this via roles if needed
		}),
	],
	preview: {
		select: {
			title: 'customerEmail',
			subtitle: 'stripeSessionId',
			timestamp: 'orderTimestamp',
			orderItems: 'orderItems',
		},
		prepare(selection) {
			const { title, subtitle, orderItems } = selection;
			const itemCount = orderItems?.length || 0;
			const totalQuantity = orderItems?.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 0), 0) || 0;
			
			return {
				title: title || 'No Email',
				subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''} (${totalQuantity} total) • ${subtitle || 'No Session ID'}`,
				media: undefined,
			};
		},
	},
});
