import {DocumentIcon} from '@sanity/icons/Document'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  description: 'Standalone pages such as About Us, Get Involved or Resources',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'The URL path, e.g. "about" for /about',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'intro', type: 'text', rows: 3}),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
        }),
      ],
    }),
  ],
})
