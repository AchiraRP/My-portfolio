import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Link', value: 'link'},
          {title: 'Book', value: 'book'},
          {title: 'Article', value: 'article'},
        ]
      }
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'phase',
      title: 'Phase',
      type: 'reference',
      to: [{type: 'phase'}],
    }),
  ],
})
