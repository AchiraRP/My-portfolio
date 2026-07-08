import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'certificate',
      title: 'Certificate URL',
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
