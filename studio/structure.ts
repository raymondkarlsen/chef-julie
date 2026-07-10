import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Forside')
        .id('frontPage')
        .child(
          S.document().schemaType('frontPage').documentId('frontPage').title('Forside'),
        ),
      S.divider(),
      S.documentTypeListItem('recipe').title('Oppskrifter'),
    ])
