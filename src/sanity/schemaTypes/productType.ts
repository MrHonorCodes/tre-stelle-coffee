import { defineField, defineType } from 'sanity';

export const productType = defineType({
	name: 'product',
	title: 'Product',
	type: 'document',
	fields: [
		defineField({
			name: 'productId',
			title: 'Product ID',
			type: 'string',
			validation: (Rule) =>
				Rule.required()
				.error('Product ID is required')
				.custom((value, context) => {
					// Enforce uniqueness across documents
					if (!value) return true;
					const { document } = context as { document?: { _id?: string } };
					const id = document?._id || '';
					return context?.getClient({ apiVersion: '2024-05-01' })
						.fetch("count(*[_type == 'product' && productId == $pid && _id != $id])", { pid: value, id })
						.then((count: number) => (count === 0 ? true : 'Product ID must be unique'));
				}),
			description: 'Unique identifier for this product (used for order tracking and Stripe integration). Example: prod_XXXX',
		}),
		defineField({
			name: 'name',
			title: 'Product Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'images',
			title: 'Product Images',
			type: 'array',
			of: [{ type: 'image', options: { hotspot: true } }],
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: 'details',
			title: 'Details',
			type: 'array', // Using array of blocks for rich text
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'price',
			title: 'Price (in USD)',
			type: 'number',
			validation: (Rule) => Rule.required().precision(2).positive(),
			description: 'Enter price in USD, e.g., 15.99',
		}),
		defineField({
			name: 'stripePriceId',
			title: 'Stripe Price ID',
			type: 'string',
			validation: (Rule) => Rule.required(),
			description: 'The Price ID from your Stripe account (e.g., price_xxxxxxxxxxxxxx)',
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Whole Bean', value: 'whole-bean' },
					{ title: 'Merchandise', value: 'merchandise' },
					{ title: 'Brewing Gear', value: 'brewing-gear' },
					{ title: 'Subscription', value: 'subscription' }, // Optional, if needed later
				],
				layout: 'dropdown', // Or 'radio'
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'isOutOfStock',
			title: 'Out of Stock',
			type: 'boolean',
			initialValue: false,
			description: 'Check this box if the product is currently out of stock.',
		}),
		defineField({
			name: 'reviews',
			title: 'Reviews',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'review' }] }],
			// Optional: If you want to see reviews directly in the product form,
			// you might need a custom input component or adjust preview settings.
			// For now, this sets up the relationship.
		}),
		defineField({
			name: 'sizes',
			title: 'Available Sizes',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Small', value: 'S' },
					{ title: 'Medium', value: 'M' },
					{ title: 'Large', value: 'L' },
					{ title: 'Extra Large', value: 'XL' },
					{ title: 'XX Large', value: 'XXL' },
				],
			},
			description: 'Select all available sizes for merchandise products.',
		}),
		// You can add more fields here later, like SKU, stock levels, variants, etc.
	],
	preview: {
		select: {
			title: 'name',
			media: 'images',
			category: 'category',
			price: 'price',
		},
		prepare({ title, media, category, price }) {
			return {
				title: title,
				subtitle: `${category ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') : ''} - $${price}`,
				media: media && media.length > 0 ? media[0] : undefined,
			};
		},
	},
});

export default productType;
