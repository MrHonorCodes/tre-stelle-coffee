import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
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
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image hotspot for better cropping
      },
      validation: (Rule) => Rule.required(),
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
          { title: 'Coffee Beans', value: 'coffee-beans' },
          { title: 'Ground Coffee', value: 'ground-coffee' },
          { title: 'Merchandise', value: 'merchandise' },
          { title: 'Brewing Gear', value: 'brewing-gear' },
          { title: 'Subscription', value: 'subscription' }, // Optional, if needed later
        ],
        layout: 'dropdown', // Or 'radio'
      },
      validation: (Rule) => Rule.required(),
    }),
    // You can add more fields here later, like SKU, stock levels, variants, etc.
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      category: 'category',
      price: 'price',
    },
    prepare({ title, media, category, price }) {
      return {
        title: title,
        subtitle: `${category ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') : ''} - $${price}`,
        media: media,
      };
    },
  },
});

export default productType; 