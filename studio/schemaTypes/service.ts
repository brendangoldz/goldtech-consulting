import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CogIcon,
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
      name: 'title',
      type: 'string',
      title: 'Title',
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
      name: 'description',
      type: 'text',
      title: 'Short Description',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Icon name for UI (e.g. FaLaptopCode, FaChartLine). Used by frontend.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first. Leave blank for default order.',
    }),
  ],
  orderings: [
    { title: 'Order (asc)', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Order (desc)', name: 'orderDesc', by: [{ field: 'order', direction: 'desc' }] },
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
