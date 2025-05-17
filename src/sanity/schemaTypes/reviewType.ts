import { defineField, defineType } from 'sanity';

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 },
        ],
        layout: 'radio', // Or 'dropdown'
      },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorEmail',
      title: 'Author Email',
      type: 'string',
      // validation: (Rule) => Rule.email(), // Optional: add email validation
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm'
      },
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'isApproved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Reviews will only be displayed on the site once approved.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'authorName',
      product: 'product.name', // To show which product the review is for
      rating: 'rating',
      isApproved: 'isApproved',
    },
    prepare({ title, author, product, rating, isApproved }) {
      return {
        title: title || 'Untitled Review',
        subtitle: `${product ? `Product: ${product} - ` : ''}By: ${author || 'Anonymous'} - Rating: ${rating}/5 ${isApproved ? ' (Approved)' : ' (Pending)'}`,
      };
    },
  },
});

export default reviewType; 