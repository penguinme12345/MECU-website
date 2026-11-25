import {UserIcon} from '@sanity/icons/User'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'bio',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
  preview: {
    select: {title: 'name', media: 'image'},
  },
})
