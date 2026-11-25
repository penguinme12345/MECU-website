import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 2}),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Academic', value: 'academic'},
          {title: 'Career & co-op', value: 'career'},
          {title: 'Wellness', value: 'wellness'},
          {title: 'Campus & student life', value: 'campus'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 10,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category'}},
})
