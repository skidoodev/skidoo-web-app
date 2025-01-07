import { type SchemaTypeDefinition } from 'sanity'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { likeType } from './likes'
import { tagType } from './tag'

export const schema: { types: SchemaTypeDefinition[] } = {
 types: [blockContentType, categoryType, postType, tagType, authorType, likeType],
}