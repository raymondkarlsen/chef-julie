import {defineField, defineType} from 'sanity'

export const recipe = defineType({
  name: 'recipe',
  title: 'Oppskrift',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      description: 'Navnet på oppskriften, f.eks. «Julies chocolate chip cookies».',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Nettadresse (slug)',
      type: 'slug',
      description: 'Lages automatisk fra tittelen. Trykk «Generate» hvis den er tom.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 3,
      description: 'En kort, fristende beskrivelse som vises øverst og på forsiden.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hovedbilde',
      type: 'image',
      description: 'Det store bildet av retten. Dra og slipp et bilde her.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst (for skjermlesere)',
          type: 'string',
          description: 'Beskriv bildet kort, f.eks. «Nybakte cookies på et stekebrett».',
        }),
      ],
    }),
    defineField({
      name: 'servings',
      title: 'Antall porsjoner',
      type: 'number',
      description: 'Hvor mange man får av oppskriften.',
    }),
    defineField({
      name: 'prepTime',
      title: 'Forberedelsestid',
      type: 'string',
      description: 'F.eks. «15 min».',
    }),
    defineField({
      name: 'totalTime',
      title: 'Total tid',
      type: 'string',
      description: 'F.eks. «30 min».',
    }),
    defineField({
      name: 'difficulty',
      title: 'Vanskelighetsgrad',
      type: 'string',
      options: {
        list: [
          {title: 'Enkel', value: 'Enkel'},
          {title: 'Middels', value: 'Middels'},
          {title: 'Avansert', value: 'Avansert'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      description: 'F.eks. «Bakst», «Middag» eller «Dessert».',
    }),
    defineField({
      name: 'tags',
      title: 'Emneknagger',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Stikkord som beskriver retten, f.eks. «søtt», «sjokolade».',
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'ingredientGroups',
      title: 'Ingredienser',
      type: 'array',
      description: 'Legg til ingrediensene. Du kan dele dem i grupper (f.eks. «Deig» og «Fyll»).',
      of: [
        defineField({
          name: 'group',
          title: 'Gruppe',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfri)',
              type: 'string',
              description: 'La stå tom hvis du bare har én liste med ingredienser.',
            }),
            defineField({
              name: 'items',
              title: 'Ingredienser',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: {heading: 'heading', items: 'items'},
            prepare({heading, items}) {
              return {
                title: heading || 'Ingredienser',
                subtitle: items ? `${items.length} ingredienser` : '',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'instructions',
      title: 'Slik gjør du',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Skriv ett steg per linje. De blir nummerert automatisk på siden.',
    }),
    defineField({
      name: 'tips',
      title: 'Tips',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Valgfrie tips, ett per linje.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publiseringsdato',
      type: 'datetime',
      description: 'Brukes til å sortere oppskriftene (nyeste først).',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'heroImage'},
  },
})
