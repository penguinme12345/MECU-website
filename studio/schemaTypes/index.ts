import {article} from './article'
import {author} from './author'
import {category} from './category'
import {event} from './event'
import {opportunity} from './opportunity'
import {page} from './page'
import {program} from './program'
import {resource} from './resource'
import {siteSettings} from './siteSettings'
import {teamMember} from './teamMember'

export const schemaTypes = [
  siteSettings,
  event,
  article,
  page,
  program,
  teamMember,
  opportunity,
  resource,
  author,
  category,
]
