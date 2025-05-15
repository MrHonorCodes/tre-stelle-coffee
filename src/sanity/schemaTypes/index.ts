import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { productType } from './productType'
import { pressArticleType } from './pressArticleType'
import { eventType } from './eventType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, productType, pressArticleType, eventType],
}
