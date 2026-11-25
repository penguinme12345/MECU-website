import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SINGLETON_TYPES, structure} from './structure'

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'mecu website',

  projectId: '46p0rrt6',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: (actions, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({action}) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },
})
