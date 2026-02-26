import { defineType, defineField, defineArrayMember } from 'sanity'

export const servicePageSection = defineType({
  name: 'servicePageSection',
  title: 'Service Page Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
})
