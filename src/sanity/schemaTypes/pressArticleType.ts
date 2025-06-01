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
			validation: (Rule) =>
				Rule.uri({
					scheme: ['http', 'https'],
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
		defineField({
			name: 'videoUrl',
			title: 'Video URL (optional)',
			type: 'url',
			description: 'Optional. Video URL for any video content (YouTube, Vimeo, WFAA, etc.). For featured articles, this will be used instead of the image when available.',
			validation: (Rule) =>
				Rule.uri({
					scheme: ['http', 'https'],
				}),
		}),
		defineField({
			name: 'isFeatured',
			title: 'Featured Article',
			type: 'boolean',
			description: 'Mark this article as a featured item on the press page.',
			initialValue: false,
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
