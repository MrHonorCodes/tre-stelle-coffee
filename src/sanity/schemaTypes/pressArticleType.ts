import { defineField, defineType } from 'sanity';

export const pressArticleType = defineType({
  name: 'pressArticle',
  title: 'Press Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceName',
      title: 'Publication/Source Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'URL to Article',
      type: 'url',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt/Summary',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'A short summary or a key quote from the article.',
    }),
    defineField({
      name: 'image',
      title: 'Associated Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional. E.g., publication logo or a relevant photo.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      source: 'sourceName',
      date: 'publicationDate',
      media: 'image',
    },
    prepare({ title, source, date, media }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: title,
        subtitle: `${source}${formattedDate ? ' - ' + formattedDate : ''}`,
        media: media,
      };
    },
  },
});

export default pressArticleType; 