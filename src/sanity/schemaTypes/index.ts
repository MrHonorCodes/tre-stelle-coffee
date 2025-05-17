import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { productType } from './productType'
import { pressArticleType } from './pressArticleType'
// import { eventType } from './eventType'
import { reviewType } from './reviewType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, productType, pressArticleType, reviewType],
}
