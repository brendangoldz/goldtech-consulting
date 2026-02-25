import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { seoFields } from './shared/seoFields'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'lane',
      type: 'string',
      title: 'Lane',
      options: {
        list: [
          { title: 'Consulting', value: 'consulting' },
          { title: 'Marketing', value: 'marketing' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
      description: 'Small label above the main heading (e.g. "Web development").',
    }),
    defineField({
      name: 'intro',
      type: 'text',
      title: 'Intro',
      rows: 3,
    }),
    ...seoFields,
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        defineArrayMember({
          type: 'servicePageSection',
        }),
      ],
    }),
    defineField({
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      fields: [
        defineField({ name: 'text', type: 'string', title: 'Button Text' }),
        defineField({ name: 'href', type: 'string', title: 'Link (e.g. /consulting#contact)' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', lane: 'lane' },
    prepare({ title, lane }) {
      return {
        title: title || 'Untitled',
        subtitle: lane ? (lane === 'consulting' ? 'Consulting' : 'Marketing') : undefined,
      }
    },
  },
})
