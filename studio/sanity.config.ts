import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'hy55n3fs',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton for Resume
            S.listItem()
              .title('Resume settings')
              .id('resume')
              .child(S.document().schemaType('resume').documentId('resume')),
            // Regular document types
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['resume'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
