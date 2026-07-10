import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6s8gofp5',
    dataset: 'production'
  },
  studioHost: 'chef-julie',
  deployment: {
    appId: 'qdc4ovt88ueis9mhlkynodnu',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
