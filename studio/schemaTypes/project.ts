import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'image',
      title: 'Image URL or Path',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    }),
    defineField({
      name: 'liveLink',
      title: 'Live Link',
      type: 'url',
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
