import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'summary',
      title: 'Professional Summary',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category (e.g. Programming)', type: 'string' },
            { name: 'items', title: 'Skills (comma separated)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'company', title: 'Company', type: 'string' },
            { name: 'dateRange', title: 'Date Range', type: 'string' },
            { name: 'tools', title: 'Tools Used', type: 'string' },
            { name: 'description', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'certifications',
      title: 'Featured Certifications',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'certification' }] }],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'degree', title: 'Degree', type: 'string' },
            { name: 'school', title: 'School / University', type: 'string' },
            { name: 'graduation', title: 'Graduation Year', type: 'string' },
            { name: 'cgpa', title: 'CGPA / Grade', type: 'string' },
          ],
        },
      ],
    }),
  ],
});
