import {BookIcon} from '@sanity/icons/Book'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'summary', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({
      name: 'highlights',
      title: 'What MECU offers this program',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'officialUrl', title: 'Official TMU program page', type: 'url'}),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 10,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'summary'}},
})
