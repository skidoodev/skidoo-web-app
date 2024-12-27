import { defineField, defineType } from "sanity";

export const likeType = defineType({
    name: 'like',
    title: 'Like',
    type: 'document',
    fields: [
      defineField({
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{type: 'post'}]
      }),
      defineField({
        name: 'userId',
        title: 'User ID',
        type: 'string'
      }),
      defineField({
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        initialValue: () => new Date().toISOString()
      })
    ]
  })