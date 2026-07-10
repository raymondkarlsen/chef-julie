import {defineField, defineType} from 'sanity'

export const frontPage = defineType({
  name: 'frontPage',
  title: 'Forside',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      description: 'Den store teksten øverst på forsiden, f.eks. «Jeg heter Julie.».',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introtekst',
      type: 'text',
      rows: 3,
      description: 'Den korte teksten under overskriften.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      description: 'Bildet som vises ved siden av teksten (f.eks. logo eller et bilde av Julie).',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst (for skjermlesere)',
          type: 'string',
          description: 'Beskriv bildet kort.',
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare({title, media}) {
      return {title: 'Forside', subtitle: title, media}
    },
  },
})
