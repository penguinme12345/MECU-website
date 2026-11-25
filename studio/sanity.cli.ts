import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '46p0rrt6',
    dataset: 'production'
  },
  typegen: {
    enabled: true,
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
  deployment: {
    appId: 'kp4ot5ghrlpiv9b743xrutqr',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
