import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'home', title: 'Home', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'social', title: 'Social links'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'announcement',
      title: 'Announcement banner',
      type: 'string',
      description: 'Shown at the top of every page. Leave empty to hide it.',
      group: 'home',
    }),
    defineField({
      name: 'mission',
      title: 'Hero mission line',
      type: 'text',
      rows: 2,
      group: 'home',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero photo',
      type: 'image',
      description: 'A group photo works best. It appears behind a purple overlay.',
      options: {hotspot: true},
      group: 'home',
    }),
    defineField({
      name: 'email',
      title: 'General email',
      type: 'email',
      group: 'contact',
    }),
    defineField({
      name: 'sponsorshipEmail',
      title: 'Sponsorship email',
      type: 'email',
      group: 'contact',
    }),
    defineField({name: 'officeLocation', title: 'Office / lounge', type: 'string', group: 'contact'}),
    defineField({name: 'officeHours', title: 'Office hours', type: 'string', group: 'contact'}),
    defineField({name: 'instagramUrl', title: 'Instagram', type: 'url', group: 'social'}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn', type: 'url', group: 'social'}),
    defineField({name: 'discordUrl', title: 'Discord', type: 'url', group: 'social'}),
    defineField({name: 'mailingListUrl', title: 'Mailing list sign-up', type: 'url', group: 'social'}),
    defineField({
      name: 'landAcknowledgment',
      title: 'Land acknowledgment',
      type: 'text',
      rows: 4,
      description: "Use TMU's official wording",
      group: 'footer',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
