import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'studyDocument',
  title: 'Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
    }),
    defineField({
      name: 'markdownContent',
      title: 'Markdown Content',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'phase',
      title: 'Phase',
      type: 'reference',
      to: [{type: 'phase'}],
    }),
  ],
})
