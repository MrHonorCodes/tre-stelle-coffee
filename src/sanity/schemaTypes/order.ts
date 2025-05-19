import {defineField, defineType} from 'sanity'

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
      name: 'productDetails', // Changed from 'product' to be more descriptive
      title: 'Product Details',
      type: 'text', // Using text for potentially longer product descriptions or multiple items
      readOnly: true,
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
    },
    prepare(selection) {
      const {title, subtitle, timestamp} = selection
      return {
        title: title || 'No Email',
        subtitle: `Order ID: ${subtitle || 'N/A'}`,
        media: undefined, // No media for orders, or you could add an icon
        timestamp: timestamp ? new Date(timestamp).toLocaleDateString() : 'No Date'
      }
    },
  },
}) 