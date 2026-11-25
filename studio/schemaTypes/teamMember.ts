import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Council member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'group',
      type: 'string',
      options: {
        list: [
          {title: 'Executive', value: 'executive'},
          {title: 'Director', value: 'director'},
          {title: 'Program / year representative', value: 'representative'},
        ],
        layout: 'radio',
      },
      initialValue: 'director',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'program', type: 'reference', to: [{type: 'program'}]}),
    defineField({name: 'year', type: 'string', description: 'e.g. 3rd year'}),
    defineField({
      name: 'photo',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
    }),
    defineField({
      name: 'email',
      title: 'Role email',
      type: 'email',
      description: 'Use a role address rather than a personal one',
    }),
    defineField({name: 'linkedinUrl', title: 'LinkedIn', type: 'url'}),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 10,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
