import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {defineField, defineType} from 'sanity'

export const opportunity = defineType({
  name: 'opportunity',
  title: 'Opportunity',
  type: 'document',
  icon: BulbOutlineIcon,
  description: 'Open roles and ways to get involved',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Council role', value: 'council'},
          {title: 'Volunteer', value: 'volunteer'},
          {title: 'Program representative', value: 'representative'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'applyUrl', title: 'Application link', type: 'url'}),
    defineField({name: 'deadline', type: 'date'}),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 10,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'kind'}},
})
