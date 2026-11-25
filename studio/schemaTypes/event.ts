import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Starts',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Ends',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = (context.document as {startDate?: string} | undefined)?.startDate
          if (endDate && startDate && endDate < startDate) return 'Must be after the start'
          return true
        }),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Social', value: 'social'},
          {title: 'Academic', value: 'academic'},
          {title: 'Career', value: 'career'},
          {title: 'Council', value: 'council'},
        ],
        layout: 'radio',
      },
      initialValue: 'social',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'location', type: 'string'}),
    defineField({name: 'description', type: 'text', rows: 4}),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration / info link',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Start date, newest first',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', startDate: 'startDate', location: 'location', media: 'image'},
    prepare({title, startDate, location, media}) {
      const date = startDate
        ? new Date(startDate).toLocaleDateString('en-CA', {dateStyle: 'medium'})
        : 'No date'
      return {title, subtitle: [date, location].filter(Boolean).join(' · '), media}
    },
  },
})
