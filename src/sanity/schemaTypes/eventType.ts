import { defineField, defineType } from 'sanity';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'eventName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'E.g., \"123 Main St, Anytown\", \"Online\", or specific venue name.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      // validation: (Rule) => Rule.required(), // Optional, depending on requirements
    }),
    defineField({
      name: 'bookingLink',
      title: 'Booking or More Info URL',
      type: 'url',
      description: 'Optional: Link to Eventbrite, registration form, or more details.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Highlight this event on the website?',
      initialValue: false,
    }),
    // Consider adding fields for price, capacity, speaker/host, etc. if needed.
  ],
  preview: {
    select: {
      title: 'eventName',
      date: 'eventDate',
      media: 'image',
      isFeatured: 'isFeatured',
    },
    prepare({ title, date, media, isFeatured }) {
      const formattedDate = date ? new Date(date).toLocaleString() : 'Date TBD';
      return {
        title: `${title}${isFeatured ? ' (Featured)' : ''}`,
        subtitle: formattedDate,
        media: media,
      };
    },
  },
});

export default eventType; 