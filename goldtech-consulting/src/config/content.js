/**
 * Content Configuration - Differentiated content for Marketing vs Consulting
 * 
 * This file contains all the copy and content that differs between
 * the Marketing and Consulting variants of the site.
 */

export const contentConfig = {
  consulting: {
    hero: {
      trustIndicator: 'Delivered Solutions for 50+ businesses worldwide',
      heading: {
        line1: 'Build',
        highlight1: 'Faster',
        line2: 'Ship',
        highlight2: 'Cleaner',
        line3: 'Look',
        highlight3: 'Premium'
      },
      subtitle: 'Expert software development consulting based in NJ, serving businesses nationwide. Custom software development, web apps, cloud solutions, and QA automation for businesses nationwide.',
      primaryCTA: 'Start Your Project',
      secondaryCTA: 'View Our Services'
    },
    about: {
      eyebrow: 'Who we are',
      title: 'About GoldTech Consulting',
      subtitle: 'We harness the power of technology to drive business transformation—pairing engineering rigor with product sensibility.',
      description: 'From cloud solutions and QA automation to bespoke web apps and integrations, our team delivers outcomes, not just artifacts. We keep accessibility, performance, and maintainability front and center—so you scale with confidence.',
      features: [
        'Cloud-first architecture & DevOps',
        'Accessible, responsive UI/UX',
        'Integration with your existing stack',
        'Measurable impact and clear reporting'
      ],
      techStack: ['React', 'Node', 'AWS', 'PostgreSQL', 'CICD'],
      image: '/at_desk_smirk.JPG',
      imageAlt: 'Brendan at his desk working on software development'
    },
    services: {
      eyebrow: 'What we do',
      title: 'Our Services',
      subtitle: 'Modular offerings that can be engaged individually or combined into an end-to-end delivery model.',
      items: [
        {
          icon: 'FaLaptopCode',
          title: 'Custom Software Development',
          desc: 'Tailor-made, scalable, and robust solutions for startups and enterprises.'
        },
        {
          icon: 'FaChartLine',
          title: 'Tech Consultation & Strategy',
          desc: 'Technology-driven strategies that give your business a competitive edge.'
        },
        {
          icon: 'FaShieldAlt',
          title: 'IoT Implementation, Integration, & Optimization',
          desc: 'Seamless Internet of Things implementations and streamlined operations across your stack.'
        },
        {
          icon: 'FaMobileAlt',
          title: 'Project Management & Automation',
          desc: 'Engineering focused project management and automation, performance monitoring, and release readiness.'
        }
      ]
    },
    projects: {
      eyebrow: 'Proof',
      title: 'Case Studies',
      subtitle: 'A peek at how we turn requirements into reliable, production-grade systems.',
      items: [
        {
          title: '200+ Websites Delivered for Entrepreneurs & Businesses',
          summary: 'Designed and developed modern Wix websites with custom branding, optimized layouts, and scalable templates. Streamlined delivery process reduced turnaround time and enabled consistent, premium-quality results across industries.'
        }
      ]
    },
    footer: {
      description: 'Your trusted partner for modern software, integrations, and QA automation.',
      copyright: 'GoldTech Consulting LLC'
    },
    contact: {
      email: 'brendan@goldtech-consulting.com',
      location: 'Mount Laurel, NJ',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/brendangoldsmith/',
        github: 'https://github.com/brendangoldz',
        upwork: 'https://www.upwork.com/freelancers/~014de678477c7c319c?mp_source=share'
      }
    }
  },
  marketing: {
    hero: {
      trustIndicator: 'Created 100+ Marketing Campaigns for Growing Brands',
      heading: {
        line1: 'Grow',
        highlight1: 'Smarter',
        line2: 'Engage',
        highlight2: 'Deeper',
        line3: 'Convert',
        highlight3: 'Better'
      },
      subtitle: 'Full-service digital marketing agency in NJ, serving businesses nationwide. SEO consulting, social media marketing, content creation, and brand development services for growing businesses.',
      primaryCTA: 'Get Started',
      secondaryCTA: 'See Our Work'
    },
    about: {
      eyebrow: 'Who we are',
      title: 'About GoldTech Marketing',
      subtitle: 'We combine data-driven insights with creative excellence to deliver marketing campaigns that resonate and convert.',
      description: 'From brand strategy and content creation to digital advertising and analytics, we help businesses connect with their audience and achieve sustainable growth. Every campaign is built on a foundation of research, creativity, and measurable outcomes.',
      features: [
        'Data-driven strategy & analytics',
        'Creative content & brand development',
        'Multi-channel campaign management',
        'ROI tracking and performance optimization'
      ],
      techStack: ['SEO', 'Design', 'Social Media', 'Analytics', 'Content'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
      imageAlt: 'Professional marketing workspace - Coming soon'
    },
    services: {
      eyebrow: 'What we do',
      title: 'Our Services',
      subtitle: 'Comprehensive marketing services designed to elevate your brand and drive meaningful engagement.',
      items: [
        {
          icon: 'FaChartLine',
          title: 'Digital Marketing Strategy',
          desc: 'Comprehensive marketing strategies tailored to your business goals and target audience.'
        },
        {
          icon: 'FaMobileAlt',
          title: 'Social Media Management',
          desc: 'Engaging content creation and community management across all major platforms.'
        },
        {
          icon: 'FaLaptopCode',
          title: 'Content Creation & SEO',
          desc: 'High-quality content that ranks, engages, and converts your audience.'
        },
        {
          icon: 'FaShieldAlt',
          title: 'Brand Development & Design',
          desc: 'Complete brand identity development from concept to execution across all touchpoints.'
        }
      ]
    },
    projects: {
      eyebrow: 'Results',
      title: 'Success Stories',
      subtitle: 'Real campaigns, real results—see how we\'ve helped brands achieve their marketing goals.',
      items: [
        {
          title: '200+ Wix Websites Delivered for Entrepreneurs & Businesses',
          summary: 'Designed, developed and executed fully-responsive Wix websites for public speaking students. '
        }
      ]
    },
    footer: {
      description: 'Strategic marketing solutions that drive growth, engagement, and measurable results for your business.',
      copyright: 'GoldTech Marketing LLC'
    },
    contact: {
      email: 'heather@goldtech-consulting.com',
      location: 'Mount Laurel, NJ',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/brendangoldsmith/',
        github: 'https://github.com/brendangoldz',
        upwork: 'https://www.upwork.com/freelancers/~014de678477c7c319c?mp_source=share'
      }
    }
  }
};

/**
 * Get content for a specific variant
 * 
 * @param {string} variant - 'consulting' or 'marketing'
 * @returns {Object} Content configuration for the variant
 */
export const getContent = (variant = 'consulting') => {
  return contentConfig[variant] || contentConfig.consulting;
};

