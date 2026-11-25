import {CogIcon} from '@sanity/icons/Cog'
import type {StructureResolver} from 'sanity/structure'

export const SINGLETON_TYPES = new Set(['siteSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('article').title('News'),
      S.divider(),
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('program').title('Programs'),
      S.documentTypeListItem('teamMember').title('Council'),
      S.documentTypeListItem('opportunity').title('Opportunities'),
      S.documentTypeListItem('resource').title('Resources'),
      S.divider(),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('category').title('Categories'),
    ])
