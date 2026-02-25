import { defineType, defineField, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Site Config',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'about', title: 'About' },
    { name: 'services', title: 'Services (intro)' },
    { name: 'projects', title: 'Projects / Case Studies' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      description: 'Which site variant this config applies to (single-lane: use "default").',
      options: {
        list: [
          { title: 'Default (single lane)', value: 'default' },
          { title: 'Consulting', value: 'consulting' },
          { title: 'Marketing', value: 'marketing' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    // Hero
    defineField({
      name: 'heroTrustIndicator',
      type: 'string',
      title: 'Hero Trust Indicator',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeading',
      type: 'object',
      title: 'Hero Heading',
      group: 'hero',
      fields: [
        defineField({ name: 'line1', type: 'string', title: 'Line 1' }),
        defineField({ name: 'highlight1', type: 'string', title: 'Highlight 1' }),
        defineField({ name: 'line2', type: 'string', title: 'Line 2' }),
        defineField({ name: 'highlight2', type: 'string', title: 'Highlight 2' }),
        defineField({ name: 'line3', type: 'string', title: 'Line 3' }),
        defineField({ name: 'highlight3', type: 'string', title: 'Highlight 3' }),
      ],
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'text',
      title: 'Hero Subtitle',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCTA',
      type: 'string',
      title: 'Hero Primary CTA',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCTA',
      type: 'string',
      title: 'Hero Secondary CTA',
      group: 'hero',
    }),
    // About
    defineField({
      name: 'aboutEyebrow',
      type: 'string',
      title: 'About Eyebrow',
      group: 'about',
    }),
    defineField({
      name: 'aboutTitle',
      type: 'string',
      title: 'About Title',
      group: 'about',
    }),
    defineField({
      name: 'aboutSubtitle',
      type: 'string',
      title: 'About Subtitle',
      group: 'about',
    }),
    defineField({
      name: 'aboutDescription',
      type: 'text',
      title: 'About Description',
      rows: 4,
      group: 'about',
    }),
    defineField({
      name: 'aboutFeatures',
      type: 'array',
      title: 'About Features',
      group: 'about',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'aboutTechStack',
      type: 'array',
      title: 'About Tech Stack / Pillars',
      group: 'about',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'aboutImage',
      type: 'image',
      title: 'About Image',
      group: 'about',
    }),
    defineField({
      name: 'aboutImageAlt',
      type: 'string',
      title: 'About Image Alt',
      group: 'about',
    }),
    // Services section intro (eyebrow, title, subtitle – service items come from Service documents)
    defineField({
      name: 'servicesEyebrow',
      type: 'string',
      title: 'Services Section Eyebrow',
      group: 'services',
    }),
    defineField({
      name: 'servicesTitle',
      type: 'string',
      title: 'Services Section Title',
      group: 'services',
    }),
    defineField({
      name: 'servicesSubtitle',
      type: 'text',
      title: 'Services Section Subtitle',
      rows: 2,
      group: 'services',
    }),
    // Projects
    defineField({
      name: 'projectsEyebrow',
      type: 'string',
      title: 'Projects Eyebrow',
      group: 'projects',
    }),
    defineField({
      name: 'projectsTitle',
      type: 'string',
      title: 'Projects Title',
      group: 'projects',
    }),
    defineField({
      name: 'projectsSubtitle',
      type: 'text',
      title: 'Projects Subtitle',
      rows: 2,
      group: 'projects',
    }),
    defineField({
      name: 'projectItems',
      type: 'array',
      title: 'Project / Case Study Items',
      group: 'projects',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectItem',
          fields: [
            defineField({ name: 'id', type: 'string', title: 'ID' }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'summary', type: 'text', title: 'Summary', rows: 3 }),
            defineField({
              name: 'screenshots',
              type: 'array',
              title: 'Screenshots',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'src', type: 'string', title: 'Image path/URL' }),
                    defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
                    defineField({ name: 'websiteUrl', type: 'url', title: 'Website URL' }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: title || 'Project' }
            },
          },
        }),
      ],
    }),
    // Footer
    defineField({
      name: 'footerDescription',
      type: 'text',
      title: 'Footer Description',
      rows: 2,
      group: 'footer',
    }),
    defineField({
      name: 'footerCopyright',
      type: 'string',
      title: 'Footer Copyright',
      group: 'footer',
    }),
    // Contact
    defineField({
      name: 'contactEmail',
      type: 'string',
      title: 'Contact Email',
      group: 'contact',
    }),
    defineField({
      name: 'contactLocation',
      type: 'string',
      title: 'Contact Location',
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Social Links',
      group: 'contact',
      fields: [
        defineField({ name: 'linkedin', type: 'url', title: 'LinkedIn' }),
        defineField({ name: 'facebook', type: 'url', title: 'Facebook' }),
        defineField({ name: 'github', type: 'url', title: 'GitHub' }),
        defineField({ name: 'upwork', type: 'url', title: 'Upwork' }),
      ],
    }),
  ],
  preview: {
    select: { variant: 'variant' },
    prepare({ variant }) {
      return {
        title: 'Site Config',
        subtitle: variant ? `Variant: ${variant}` : undefined,
      }
    },
  },
})
