import {defineType, defineField} from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Other',
      options: {
        list: ['Top Getaways', 'Within the city', 'Other']
      }
    })
  ]
})