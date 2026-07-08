import {defineField, defineType} from 'sanity'

export const badge = defineType({
  name: 'badge',
  title: 'Badge',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Earned', value: 'EARNED'},
          {title: 'In Progress', value: 'IN PROGRESS'},
          {title: 'View More', value: 'VIEW MORE'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image URL or Path',
      type: 'string',
    }),
    defineField({
      name: 'isMoreLink',
      title: 'Is this just a "View More" link card?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'phase',
      title: 'Phase',
      type: 'reference',
      to: [{type: 'phase'}],
    }),
  ],
})
