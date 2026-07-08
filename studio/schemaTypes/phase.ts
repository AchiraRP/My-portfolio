import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'phase',
  title: 'Phase',
  type: 'document',
  fields: [
    defineField({
      name: 'roadmap',
      title: 'Roadmap',
      type: 'reference',
      to: [{type: 'roadmap'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phaseNumber',
      title: 'Phase Number',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji or Lucide Icon Name)',
      type: 'string',
    }),
  ],
})
