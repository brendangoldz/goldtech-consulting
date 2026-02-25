import { defineField } from 'sanity'

export const seoFields = [
  defineField({
    name: 'seoTitle',
    type: 'string',
    title: 'SEO Title',
    description: 'Override for browser tab and search results. Leave blank to use page title.',
  }),
  defineField({
    name: 'metaDescription',
    type: 'text',
    title: 'Meta Description',
    rows: 2,
    description: 'Brief description for search results. ~155 characters recommended.',
  }),
]
