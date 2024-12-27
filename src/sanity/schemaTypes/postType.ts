import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'fullItinnerary',
      type: 'object',
      fields: [
        defineField({
          name: 'itineraryStep1',
          type: 'blockContent',
          title: 'Itinerary Step 1',
        }),
        defineField({
          name: 'itineraryStep2',
          type: 'blockContent',
          title: 'Itinerary Step 2',
        }),
        defineField({
          name: 'itineraryStep3',
          type: 'blockContent',
          title: 'Itinerary Step 3',
        }),
        defineField({
          name: 'itineraryStep4',
          type: 'blockContent',
          title: 'Itinerary Step 4',
        }),
        defineField({
          name: 'itineraryStep5',
          type: 'blockContent',
          title: 'Itinerary Step 5',
        }),
        defineField({
          name: 'itineraryStep6',
          type: 'blockContent',
          title: 'Itinerary Step 6',
        }),
        defineField({
          name: 'itineraryStep7',
          type: 'blockContent',
          title: 'Itinerary Step 7',
        }),
        defineField({
          name: 'itineraryStep8',
          type: 'blockContent',
          title: 'Itinerary Step 8',
        }),
        defineField({
          name: 'itineraryStep9',
          type: 'blockContent',
          title: 'Itinerary Step 9',
        }),
        defineField({
          name: 'itineraryStep10',
          type: 'blockContent',
          title: 'Itinerary Step 10',
        }),
        defineField({
          name: 'itineraryStep11',
          type: 'blockContent',
          title: 'Itinerary Step 11',
        }),
        defineField({
          name: 'itineraryStep12',
          type: 'blockContent',
          title: 'Itinerary Step 12',
        }),
      ],
    }),
    defineField({
      name: 'summarizedTrip',
      type: 'blockContent',
    }),
    defineField({
      name: 'packingChecklist',
      type: 'blockContent',
    }),
    defineField({
      name: 'budgetBreakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'description',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'inANutshell',
      type: 'blockContent',
    }),
    defineField({
      name: 'otherActivities',
      type: 'blockContent',
    }),
    defineField({
      name: 'faqs',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
