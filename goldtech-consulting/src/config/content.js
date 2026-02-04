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
          title: 'Wix & Custom Website Development',
          desc: 'Wix and custom website builds paired with integrations that connect your CRM, booking tools, and platforms.',
          slug: 'software-automation-consulting'
        },
        {
          icon: 'FaChartLine',
          title: 'Tech Consultation & Website Reviews',
          desc: 'Focused technical consultations with clear recommendations for tools, architecture, and site experience.',
          slug: 'system-integration-consulting'
        },
        {
          icon: 'FaShieldAlt',
          title: 'Custom Automation Development',
          desc: 'Tailor-made workflows, integrations, and monitoring that scale with your operations.',
          slug: 'custom-automation-development'
        },
        {
          icon: 'FaMobileAlt',
          title: 'Process Automation & Optimization',
          desc: 'Streamlined delivery workflows, performance monitoring, and repeatable operations.',
          slug: 'business-process-automation'
        }
      ]
    },
    projects: {
      eyebrow: 'Proof',
      title: 'Case Studies',
      subtitle: 'A peek at how we turn requirements into reliable, production-grade systems.',
      items: [
        {
          id: 'wix-websites-delivered',
          title: '100+ Websites Delivered for Entrepreneurs & Businesses',
          summary: 'Designed and developed modern Wix websites with custom branding, optimized layouts, and scalable templates. Streamlined delivery process reduced turnaround time and enabled consistent, premium-quality results across industries.',
          isShared: true,
          screenshots: [
            {
              src: '/projects/thespeakerlab-wixsite-com-tracy-jones-1.png',
              alt: 'Tracy Jones website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/tracy-jones',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-neneh-biffinger-2.png',
              alt: 'Neneh Biffinger website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/neneh-biffinger',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-paky-elhossomy-3.png',
              alt: 'Pakinam Elhossamy website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/paky-elhossomy',
            },
            {
              src: '/projects/risingtideconsultingllc-com-4.png',
              alt: 'Raina Gandhi website homepage',
              websiteUrl: 'https://www.risingtideconsultingllc.com/',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Charles Gragg website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/charles-gragg',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-ronnie-stephens-6.png',
              alt: 'Ronnie Stephens website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ronnie-stephens',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-ravin-papiah-7.png',
              alt: 'Ravin Souvendra Papiah website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ravin-papiah',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-tycho-bergquist-8.png',
              alt: 'Tycho Bergquist website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/tycho-bergquist',
            },
            {
              src: '/projects/markdecarlospeaker-com-9.png',
              alt: 'Mark DeCarlo website homepage',
              websiteUrl: 'https://www.markdecarlospeaker.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-philip-brittain-10.png',
              alt: 'Philip Brittain website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/philip-brittain',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-crystal-mackay-11.png',
              alt: 'Crystal Mackay website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/crystal-mackay',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-ann-kerian-12.png',
              alt: 'Ann Kerian website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ann-kerian',
            },
            {
              src: '/projects/debitaylor-com-13.png',
              alt: 'Debi Taylor website homepage',
              websiteUrl: 'https://www.debitaylor.com/',
            },
            {
              src: '/projects/dianebradford-com-14.png',
              alt: 'Diane Bradford website homepage',
              websiteUrl: 'https://www.dianebradford.com/',
            },
            {
              src: '/projects/kariehmer-com-15.png',
              alt: 'Kari Ehmer website homepage',
              websiteUrl: 'https://www.kariehmer.com/',
            },
            {
              src: '/projects/joshuajohnson-me-16.png',
              alt: 'Joshua Johnson website homepage',
              websiteUrl: 'https://www.joshuajohnson.me/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Debra Gonsher Vinik website homepage',
              websiteUrl: 'https://www.gratitudewrangler.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-debjani-biswas-18.png',
              alt: 'Debjani Biswas website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/debjani-biswas',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Ashley Eichorn website homepage',
              websiteUrl: 'https://www.ashleyeichornspeaks.com/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Courageous Fire website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/courageous-fire',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-giselle-s-phillips-21.png',
              alt: 'Giselle Sandy Phillips website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/giselle-s-phillips',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Brenda McAdoo website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/brenda-mcadoo',
            },
            {
              src: '/projects/rodneyschlosser-com-24.png',
              alt: 'Rodney Schlosser website homepage',
              websiteUrl: 'https://www.rodneyschlosser.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-erin-zandstra-25.png',
              alt: 'Erin Zandstra website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/erin-zandstra',
            },
            {
              src: '/projects/chelseaambrose-com-26.png',
              alt: 'Chelsea Ambrose website homepage',
              websiteUrl: 'https://www.chelseaambrose.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jarrod-day-27.png',
              alt: 'Jarrod Day website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jarrod-day',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-crystal-culp-28.png',
              alt: 'Crystal Culp website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/crystal-culp',
            },
            {
              src: '/projects/sandyvecchi-com-29.png',
              alt: 'Sandy Vecchi website homepage',
              websiteUrl: 'https://www.sandyvecchi.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-laura-young-30.png',
              alt: 'Laura Young website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/laura-young',
            },
            {
              src: '/projects/growdisciples-net-31.png',
              alt: 'Ron Bush website homepage',
              websiteUrl: 'https://www.growdisciples.net/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-mary-curran-hackett-32.png',
              alt: 'Mary Curran Hackett website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/mary-curran-hackett',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-david-king-33.png',
              alt: 'David King website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/david-king',
            },
            {
              src: '/projects/kyle2402-wixsite-com-mysite-34.png',
              alt: 'kyle bunch website homepage',
              websiteUrl: 'https://kyle2402.wixsite.com/mysite',
            },
            {
              src: '/projects/louiscamassa-com-35.png',
              alt: 'Louis Camassa website homepage',
              websiteUrl: 'https://www.louiscamassa.com/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Mo Nelson website homepage',
              websiteUrl: 'https://www.monelsonspeaks.com/',
            },
            {
              src: '/projects/martiouellette-com-37.png',
              alt: 'Marti Ouellette website homepage',
              websiteUrl: 'https://www.martiouellette.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-bear-murray-38.png',
              alt: 'Bear Murray website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/bear-murray',
            },
            {
              src: '/projects/kathywalterhouse-com-39.png',
              alt: 'Kathy Walterhouse website homepage',
              websiteUrl: 'https://www.kathywalterhouse.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-luther-simmons-40.png',
              alt: 'Luther Simmons website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/luther-simmons',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-beth-guyton-41.png',
              alt: 'Beth Guyton website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/beth-guyton',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-camilo-gomez-42.png',
              alt: 'Camilo Gomez website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/camilo-gomez',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-alex-ruiz-43.png',
              alt: 'Alex Ruiz website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/alex-ruiz',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Janie Honeycutt website homepage',
              websiteUrl: 'https://www.honeycutt-consulting.com/',
            },
            {
              src: '/projects/shilaiegipaya-com-45.png',
              alt: 'Shilaie Gipaya website homepage',
              websiteUrl: 'https://www.shilaiegipaya.com/',
            },
            {
              src: '/projects/authordannywhite-com-46.png',
              alt: 'Danny White website homepage',
              websiteUrl: 'https://www.authordannywhite.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-liz-obrien-47.png',
              alt: 'Liz OBrien website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/liz-obrien',
            },
            {
              src: '/projects/thegabrieltorres-com-48.png',
              alt: 'Gabriel Torres website homepage',
              websiteUrl: 'https://www.thegabrieltorres.com/',
            },
            {
              src: '/projects/donnalevibooks-wixsite-com-donna-levi-49.png',
              alt: 'Donna Levi website homepage',
              websiteUrl: 'https://donnalevibooks.wixsite.com/donna-levi',
            },
            {
              src: '/projects/teonnatalks-com-50.png',
              alt: 'Teonna Wilber website homepage',
              websiteUrl: 'https://www.teonnatalks.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-liddy-davis-51.png',
              alt: 'Liriane Davis website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/liddy-davis',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-lisa-ng-52.png',
              alt: 'Lisa Ng website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/lisa-ng',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-dewan-smith-murray-53.png',
              alt: 'Dewan Smith Murray website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/dewan-smith-murray',
            },
            {
              src: '/projects/transformwithbenjamin-com-54.png',
              alt: 'Benjamin Duveneck website homepage',
              websiteUrl: 'https://www.transformwithbenjamin.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-yvonne-randall-55.png',
              alt: 'Yvonne Randall website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/yvonne-randall',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-richelle-canavan-56.png',
              alt: 'Richelle Bixler website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/richelle-canavan',
            },
            {
              src: '/projects/traumatrap-org-57.png',
              alt: 'Amanda Houghton website homepage',
              websiteUrl: 'https://www.traumatrap.org/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Curtis Haley website homepage',
              websiteUrl: 'https://www.curtisspeaks.com/',
            },
            {
              src: '/projects/candimaur-com-59.png',
              alt: 'Candi Maur website homepage',
              websiteUrl: 'https://www.candimaur.com/',
            },
            {
              src: '/projects/drsharibowen-com-60.png',
              alt: 'Shari Bowen website homepage',
              websiteUrl: 'https://www.drsharibowen.com/',
            },
            {
              src: '/projects/dionne6039-wixsite-com-dionne-mejer-61.png',
              alt: 'Dionne Mejer website homepage',
              websiteUrl: 'https://dionne6039.wixsite.com/dionne-mejer',
            },
            {
              src: '/projects/valeriealston-com-62.png',
              alt: 'Valerie Alston website homepage',
              websiteUrl: 'https://www.valeriealston.com/',
            },
            {
              src: '/projects/drbobbooker-com-63.png',
              alt: 'Robert Booker website homepage',
              websiteUrl: 'https://www.drbobbooker.com/',
            },
            {
              src: '/projects/thesarahmoon-com-64.png',
              alt: 'Sarah Moon website homepage',
              websiteUrl: 'https://www.thesarahmoon.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-susannah-tye-65.png',
              alt: 'Susannah Tye website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/susannah-tye',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-al-parker-66.png',
              alt: 'Al Parker website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/al-parker',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Bob Skelton website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/bob-skelton',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-clayton-cranford-68.png',
              alt: 'Clayton Cranford website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/clayton-cranford',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-deb-borzellino-69.png',
              alt: 'Deb Borzellino website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/deb-borzellino',
            },
            {
              src: '/projects/virginiaaltman-wixsite-com-virginia-altman-70.png',
              alt: 'Virginia Altman website homepage',
              websiteUrl: 'https://virginiaaltman.wixsite.com/virginia-altman',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-conroy-hosier-71.png',
              alt: 'Conroy Hosier website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/conroy-hosier',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-david-potesta-72.png',
              alt: 'David Potesta website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/david-potesta',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-john-paul-mains-73.png',
              alt: 'John Paul Mains website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/john-paul-mains',
            },
            {
              src: '/projects/analisa54-wixsite-com-analisa-winther-1-74.png',
              alt: 'Analisa Winther website homepage',
              websiteUrl: 'https://analisa54.wixsite.com/analisa-winther-1',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-andi-zientara-75.png',
              alt: 'Andi Zientara website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/andi-zientara',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Ariana Pareja website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ariana-pareja',
            },
            {
              src: '/projects/patrickdunn9-wixsite-com-patrick-dunn-77.png',
              alt: 'Patrick Dunn website homepage',
              websiteUrl: 'https://patrickdunn9.wixsite.com/patrick-dunn',
            },
            {
              src: '/projects/bridgetjanequigg-wixsite-com-bridget-quigg-78.png',
              alt: 'Bridget Quigg website homepage',
              websiteUrl: 'https://bridgetjanequigg.wixsite.com/bridget-quigg',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-richard-fuqua-79.png',
              alt: 'Richard Fuqua website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/richard-fuqua',
            },
            {
              src: '/projects/johnnyjmartinez-com-80.png',
              alt: 'Johnny Martinez website homepage',
              websiteUrl: 'https://www.johnnyjmartinez.com/',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Dave Ray website homepage',
              websiteUrl: 'https://www.daverayspeaks.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-david-ward-82.png',
              alt: 'David Ward website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/david-ward',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-ellen-divers-83.png',
              alt: 'Ellen Divers website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ellen-divers',
            },
            {
              src: '/projects/gemmabulos-wixsite-com-gemma-bulos-84.png',
              alt: 'Gemma Bulos website homepage',
              websiteUrl: 'https://gemmabulos.wixsite.com/gemma-bulos',
            },
            {
              src: '/projects/drchrisspeaks-com-85.png',
              alt: 'Chris Schroeder website homepage',
              websiteUrl: 'https://www.drchrisspeaks.com/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Steve Reese website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/steven-reese',
            },
            {
              src: '/projects/emmaanddansjourney-com-87.png',
              alt: 'Emma & Dan\'s Journey website homepage',
              websiteUrl: 'https://www.emmaanddansjourney.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-nick-gravina-88.png',
              alt: 'Nick Gravina website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/nick-gravina',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-paul-wilson-89.png',
              alt: 'Paul Wilson website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/paul-wilson',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-steve-kane-90.png',
              alt: 'Stephen Kane website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/steve-kane',
            },
            {
              src: '/projects/renae242-wixsite-com-renae-scott-91.png',
              alt: 'Renae Scott website homepage',
              websiteUrl: 'https://renae242.wixsite.com/renae-scott',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-mitch-duckler-92.png',
              alt: 'Mitch Duckler website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/mitch-duckler',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-nicole-fissel-93.png',
              alt: 'Nicole Fissel website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/nicole-fissel',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jordan-reeves-2-94.png',
              alt: 'Jordan Reeves New website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jordan-reeves-2',
            },
            {
              src: '/projects/casinowatchtower-com-95.png',
              alt: 'Joseph Busby website homepage',
              websiteUrl: 'https://www.casinowatchtower.com/',
            },
            {
              src: '/projects/isaacamon-com-96.png',
              alt: 'Isaac Amon website homepage',
              websiteUrl: 'https://www.isaacamon.com/',
            },
            {
              src: '/projects/kctownes0-wixsite-com-kc-townes-97.png',
              alt: 'Asmar KC Townes website homepage',
              websiteUrl: 'https://kctownes0.wixsite.com/kc-townes',
            },
            {
              src: '/projects/jensalspeaks-com-98.png',
              alt: 'Jennifer Salisbury website homepage',
              websiteUrl: 'https://www.jensalspeaks.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jeanette-skewes-yng-99.png',
              alt: 'Jeanette Young Skewes website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jeanette-skewes-yng',
            },
            {
              src: '/projects/nickmornard-com-100.png',
              alt: 'Nick Mornard website homepage',
              websiteUrl: 'https://www.nickmornard.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jordan-reeves-101.png',
              alt: 'Jordan Reeves website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jordan-reeves',
            },
            {
              src: '/projects/briansexton-net-102.png',
              alt: 'Brian Sexton website homepage',
              websiteUrl: 'https://www.briansexton.net/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-kerel-pinder-103.png',
              alt: 'Kerel Pinder website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/kerel-pinder',
            },
            {
              src: '/projects/valueyou30-wixsite-com-emmanuel-nzuzu-104.png',
              alt: 'Emmanuel Nzuzu website homepage',
              websiteUrl: 'https://valueyou30.wixsite.com/emmanuel-nzuzu',
            },
            {
              src: '/projects/tania3487-wixsite-com-tania-jeppesen-105.png',
              alt: 'Tania Jeppesen website homepage',
              websiteUrl: 'https://tania3487.wixsite.com/tania-jeppesen',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-daniel-macdonald-106.png',
              alt: 'Daniel MacDonald website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/daniel-macdonald',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Dan Brule website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/dan-brule',
            },
            {
              src: '/projects/tcmbri24-wixsite-com-brittny-richardson-108.png',
              alt: 'Brittny Richardson website homepage',
              websiteUrl: 'https://tcmbri24.wixsite.com/brittny-richardson',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-nelly-ortiz-109.png',
              alt: 'Nelly Ortiz website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/nelly-ortiz',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-steve-drabek-110.png',
              alt: 'Steve Drabek website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/steve-drabek',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Jen Rogers website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jen-rogers',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-alexis-king-112.png',
              alt: 'Alexis King website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/alexis-king',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jim-best-113.png',
              alt: 'Jim Best website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jim-best',
            },
          ],
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
      image: '/heather_headshot.jpg',
      imageAlt: 'Heather headshot'
    },
    services: {
      eyebrow: 'What we do',
      title: 'Our Services',
      subtitle: 'Comprehensive marketing services designed to elevate your brand and drive meaningful engagement.',
      items: [
        {
          icon: 'FaChartLine',
          title: 'Digital Marketing Strategy',
          desc: 'Channel planning, paid media strategy, and ongoing optimization for measurable growth.',
          slug: 'digital-marketing-strategy'
        },
        {
          icon: 'FaMobileAlt',
          title: 'Social Media Strategy',
          desc: 'Actionable social strategy and content planning to build engagement and lead flow.',
          slug: 'social-media-management'
        },
        {
          icon: 'FaLaptopCode',
          title: 'Website & Content Optimization',
          desc: 'SEO-focused website reviews, content improvements, and performance enhancements.',
          slug: 'content-marketing-seo'
        },
        {
          icon: 'FaShieldAlt',
          title: 'Brand Book Development',
          desc: 'Brand guidelines for colors, typography, logo usage, voice, and core messaging.',
          slug: 'brand-development-design'
        }
      ]
    },
    projects: {
      eyebrow: 'Results',
      title: 'Success Stories',
      subtitle: 'Real campaigns, real results—see how we\'ve helped brands achieve their marketing goals.',
      items: [
        {
          id: 'marketing-wix-websites',
          title: '100+ Wix Websites Delivered for Entrepreneurs & Businesses',
          summary: 'Designed, developed and executed fully-responsive Wix websites for public speaking students.',
          isShared: true,
          screenshots: [
            {
              src: '/projects/thespeakerlab-wixsite-com-tracy-jones-1.png',
              alt: 'Tracy Jones website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/tracy-jones',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-neneh-biffinger-2.png',
              alt: 'Neneh Biffinger website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/neneh-biffinger',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-paky-elhossomy-3.png',
              alt: 'Pakinam Elhossamy website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/paky-elhossomy',
            },
            {
              src: '/projects/risingtideconsultingllc-com-4.png',
              alt: 'Raina Gandhi website homepage',
              websiteUrl: 'https://www.risingtideconsultingllc.com/',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Charles Gragg website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/charles-gragg',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-ronnie-stephens-6.png',
              alt: 'Ronnie Stephens website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ronnie-stephens',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-ravin-papiah-7.png',
              alt: 'Ravin Souvendra Papiah website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ravin-papiah',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-tycho-bergquist-8.png',
              alt: 'Tycho Bergquist website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/tycho-bergquist',
            },
            {
              src: '/projects/markdecarlospeaker-com-9.png',
              alt: 'Mark DeCarlo website homepage',
              websiteUrl: 'https://www.markdecarlospeaker.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-philip-brittain-10.png',
              alt: 'Philip Brittain website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/philip-brittain',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-crystal-mackay-11.png',
              alt: 'Crystal Mackay website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/crystal-mackay',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-ann-kerian-12.png',
              alt: 'Ann Kerian website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ann-kerian',
            },
            {
              src: '/projects/debitaylor-com-13.png',
              alt: 'Debi Taylor website homepage',
              websiteUrl: 'https://www.debitaylor.com/',
            },
            {
              src: '/projects/dianebradford-com-14.png',
              alt: 'Diane Bradford website homepage',
              websiteUrl: 'https://www.dianebradford.com/',
            },
            {
              src: '/projects/kariehmer-com-15.png',
              alt: 'Kari Ehmer website homepage',
              websiteUrl: 'https://www.kariehmer.com/',
            },
            {
              src: '/projects/joshuajohnson-me-16.png',
              alt: 'Joshua Johnson website homepage',
              websiteUrl: 'https://www.joshuajohnson.me/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Debra Gonsher Vinik website homepage',
              websiteUrl: 'https://www.gratitudewrangler.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-debjani-biswas-18.png',
              alt: 'Debjani Biswas website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/debjani-biswas',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Ashley Eichorn website homepage',
              websiteUrl: 'https://www.ashleyeichornspeaks.com/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Courageous Fire website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/courageous-fire',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-giselle-s-phillips-21.png',
              alt: 'Giselle Sandy Phillips website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/giselle-s-phillips',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Brenda McAdoo website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/brenda-mcadoo',
            },
            {
              src: '/projects/rodneyschlosser-com-24.png',
              alt: 'Rodney Schlosser website homepage',
              websiteUrl: 'https://www.rodneyschlosser.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-erin-zandstra-25.png',
              alt: 'Erin Zandstra website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/erin-zandstra',
            },
            {
              src: '/projects/chelseaambrose-com-26.png',
              alt: 'Chelsea Ambrose website homepage',
              websiteUrl: 'https://www.chelseaambrose.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jarrod-day-27.png',
              alt: 'Jarrod Day website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jarrod-day',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-crystal-culp-28.png',
              alt: 'Crystal Culp website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/crystal-culp',
            },
            {
              src: '/projects/sandyvecchi-com-29.png',
              alt: 'Sandy Vecchi website homepage',
              websiteUrl: 'https://www.sandyvecchi.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-laura-young-30.png',
              alt: 'Laura Young website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/laura-young',
            },
            {
              src: '/projects/growdisciples-net-31.png',
              alt: 'Ron Bush website homepage',
              websiteUrl: 'https://www.growdisciples.net/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-mary-curran-hackett-32.png',
              alt: 'Mary Curran Hackett website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/mary-curran-hackett',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-david-king-33.png',
              alt: 'David King website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/david-king',
            },
            {
              src: '/projects/kyle2402-wixsite-com-mysite-34.png',
              alt: 'kyle bunch website homepage',
              websiteUrl: 'https://kyle2402.wixsite.com/mysite',
            },
            {
              src: '/projects/louiscamassa-com-35.png',
              alt: 'Louis Camassa website homepage',
              websiteUrl: 'https://www.louiscamassa.com/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Mo Nelson website homepage',
              websiteUrl: 'https://www.monelsonspeaks.com/',
            },
            {
              src: '/projects/martiouellette-com-37.png',
              alt: 'Marti Ouellette website homepage',
              websiteUrl: 'https://www.martiouellette.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-bear-murray-38.png',
              alt: 'Bear Murray website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/bear-murray',
            },
            {
              src: '/projects/kathywalterhouse-com-39.png',
              alt: 'Kathy Walterhouse website homepage',
              websiteUrl: 'https://www.kathywalterhouse.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-luther-simmons-40.png',
              alt: 'Luther Simmons website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/luther-simmons',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-beth-guyton-41.png',
              alt: 'Beth Guyton website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/beth-guyton',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-camilo-gomez-42.png',
              alt: 'Camilo Gomez website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/camilo-gomez',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-alex-ruiz-43.png',
              alt: 'Alex Ruiz website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/alex-ruiz',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Janie Honeycutt website homepage',
              websiteUrl: 'https://www.honeycutt-consulting.com/',
            },
            {
              src: '/projects/shilaiegipaya-com-45.png',
              alt: 'Shilaie Gipaya website homepage',
              websiteUrl: 'https://www.shilaiegipaya.com/',
            },
            {
              src: '/projects/authordannywhite-com-46.png',
              alt: 'Danny White website homepage',
              websiteUrl: 'https://www.authordannywhite.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-liz-obrien-47.png',
              alt: 'Liz OBrien website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/liz-obrien',
            },
            {
              src: '/projects/thegabrieltorres-com-48.png',
              alt: 'Gabriel Torres website homepage',
              websiteUrl: 'https://www.thegabrieltorres.com/',
            },
            {
              src: '/projects/donnalevibooks-wixsite-com-donna-levi-49.png',
              alt: 'Donna Levi website homepage',
              websiteUrl: 'https://donnalevibooks.wixsite.com/donna-levi',
            },
            {
              src: '/projects/teonnatalks-com-50.png',
              alt: 'Teonna Wilber website homepage',
              websiteUrl: 'https://www.teonnatalks.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-liddy-davis-51.png',
              alt: 'Liriane Davis website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/liddy-davis',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-lisa-ng-52.png',
              alt: 'Lisa Ng website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/lisa-ng',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-dewan-smith-murray-53.png',
              alt: 'Dewan Smith Murray website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/dewan-smith-murray',
            },
            {
              src: '/projects/transformwithbenjamin-com-54.png',
              alt: 'Benjamin Duveneck website homepage',
              websiteUrl: 'https://www.transformwithbenjamin.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-yvonne-randall-55.png',
              alt: 'Yvonne Randall website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/yvonne-randall',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-richelle-canavan-56.png',
              alt: 'Richelle Bixler website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/richelle-canavan',
            },
            {
              src: '/projects/traumatrap-org-57.png',
              alt: 'Amanda Houghton website homepage',
              websiteUrl: 'https://www.traumatrap.org/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Curtis Haley website homepage',
              websiteUrl: 'https://www.curtisspeaks.com/',
            },
            {
              src: '/projects/candimaur-com-59.png',
              alt: 'Candi Maur website homepage',
              websiteUrl: 'https://www.candimaur.com/',
            },
            {
              src: '/projects/drsharibowen-com-60.png',
              alt: 'Shari Bowen website homepage',
              websiteUrl: 'https://www.drsharibowen.com/',
            },
            {
              src: '/projects/dionne6039-wixsite-com-dionne-mejer-61.png',
              alt: 'Dionne Mejer website homepage',
              websiteUrl: 'https://dionne6039.wixsite.com/dionne-mejer',
            },
            {
              src: '/projects/valeriealston-com-62.png',
              alt: 'Valerie Alston website homepage',
              websiteUrl: 'https://www.valeriealston.com/',
            },
            {
              src: '/projects/drbobbooker-com-63.png',
              alt: 'Robert Booker website homepage',
              websiteUrl: 'https://www.drbobbooker.com/',
            },
            {
              src: '/projects/thesarahmoon-com-64.png',
              alt: 'Sarah Moon website homepage',
              websiteUrl: 'https://www.thesarahmoon.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-susannah-tye-65.png',
              alt: 'Susannah Tye website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/susannah-tye',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-al-parker-66.png',
              alt: 'Al Parker website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/al-parker',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Bob Skelton website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/bob-skelton',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-clayton-cranford-68.png',
              alt: 'Clayton Cranford website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/clayton-cranford',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-deb-borzellino-69.png',
              alt: 'Deb Borzellino website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/deb-borzellino',
            },
            {
              src: '/projects/virginiaaltman-wixsite-com-virginia-altman-70.png',
              alt: 'Virginia Altman website homepage',
              websiteUrl: 'https://virginiaaltman.wixsite.com/virginia-altman',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-conroy-hosier-71.png',
              alt: 'Conroy Hosier website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/conroy-hosier',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-david-potesta-72.png',
              alt: 'David Potesta website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/david-potesta',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-john-paul-mains-73.png',
              alt: 'John Paul Mains website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/john-paul-mains',
            },
            {
              src: '/projects/analisa54-wixsite-com-analisa-winther-1-74.png',
              alt: 'Analisa Winther website homepage',
              websiteUrl: 'https://analisa54.wixsite.com/analisa-winther-1',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-andi-zientara-75.png',
              alt: 'Andi Zientara website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/andi-zientara',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Ariana Pareja website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ariana-pareja',
            },
            {
              src: '/projects/patrickdunn9-wixsite-com-patrick-dunn-77.png',
              alt: 'Patrick Dunn website homepage',
              websiteUrl: 'https://patrickdunn9.wixsite.com/patrick-dunn',
            },
            {
              src: '/projects/bridgetjanequigg-wixsite-com-bridget-quigg-78.png',
              alt: 'Bridget Quigg website homepage',
              websiteUrl: 'https://bridgetjanequigg.wixsite.com/bridget-quigg',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-richard-fuqua-79.png',
              alt: 'Richard Fuqua website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/richard-fuqua',
            },
            {
              src: '/projects/johnnyjmartinez-com-80.png',
              alt: 'Johnny Martinez website homepage',
              websiteUrl: 'https://www.johnnyjmartinez.com/',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Dave Ray website homepage',
              websiteUrl: 'https://www.daverayspeaks.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-david-ward-82.png',
              alt: 'David Ward website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/david-ward',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-ellen-divers-83.png',
              alt: 'Ellen Divers website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/ellen-divers',
            },
            {
              src: '/projects/gemmabulos-wixsite-com-gemma-bulos-84.png',
              alt: 'Gemma Bulos website homepage',
              websiteUrl: 'https://gemmabulos.wixsite.com/gemma-bulos',
            },
            {
              src: '/projects/drchrisspeaks-com-85.png',
              alt: 'Chris Schroeder website homepage',
              websiteUrl: 'https://www.drchrisspeaks.com/',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Steve Reese website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/steven-reese',
            },
            {
              src: '/projects/emmaanddansjourney-com-87.png',
              alt: 'Emma & Dan\'s Journey website homepage',
              websiteUrl: 'https://www.emmaanddansjourney.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-nick-gravina-88.png',
              alt: 'Nick Gravina website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/nick-gravina',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-paul-wilson-89.png',
              alt: 'Paul Wilson website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/paul-wilson',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-steve-kane-90.png',
              alt: 'Stephen Kane website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/steve-kane',
            },
            {
              src: '/projects/renae242-wixsite-com-renae-scott-91.png',
              alt: 'Renae Scott website homepage',
              websiteUrl: 'https://renae242.wixsite.com/renae-scott',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-mitch-duckler-92.png',
              alt: 'Mitch Duckler website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/mitch-duckler',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-nicole-fissel-93.png',
              alt: 'Nicole Fissel website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/nicole-fissel',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jordan-reeves-2-94.png',
              alt: 'Jordan Reeves New website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jordan-reeves-2',
            },
            {
              src: '/projects/casinowatchtower-com-95.png',
              alt: 'Joseph Busby website homepage',
              websiteUrl: 'https://www.casinowatchtower.com/',
            },
            {
              src: '/projects/isaacamon-com-96.png',
              alt: 'Isaac Amon website homepage',
              websiteUrl: 'https://www.isaacamon.com/',
            },
            {
              src: '/projects/kctownes0-wixsite-com-kc-townes-97.png',
              alt: 'Asmar KC Townes website homepage',
              websiteUrl: 'https://kctownes0.wixsite.com/kc-townes',
            },
            {
              src: '/projects/jensalspeaks-com-98.png',
              alt: 'Jennifer Salisbury website homepage',
              websiteUrl: 'https://www.jensalspeaks.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jeanette-skewes-yng-99.png',
              alt: 'Jeanette Young Skewes website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jeanette-skewes-yng',
            },
            {
              src: '/projects/nickmornard-com-100.png',
              alt: 'Nick Mornard website homepage',
              websiteUrl: 'https://www.nickmornard.com/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jordan-reeves-101.png',
              alt: 'Jordan Reeves website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jordan-reeves',
            },
            {
              src: '/projects/briansexton-net-102.png',
              alt: 'Brian Sexton website homepage',
              websiteUrl: 'https://www.briansexton.net/',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-kerel-pinder-103.png',
              alt: 'Kerel Pinder website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/kerel-pinder',
            },
            {
              src: '/projects/valueyou30-wixsite-com-emmanuel-nzuzu-104.png',
              alt: 'Emmanuel Nzuzu website homepage',
              websiteUrl: 'https://valueyou30.wixsite.com/emmanuel-nzuzu',
            },
            {
              src: '/projects/tania3487-wixsite-com-tania-jeppesen-105.png',
              alt: 'Tania Jeppesen website homepage',
              websiteUrl: 'https://tania3487.wixsite.com/tania-jeppesen',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-daniel-macdonald-106.png',
              alt: 'Daniel MacDonald website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/daniel-macdonald',
            },
            {
              src: '/projects/wix-showcase-1.svg',
              alt: 'Dan Brule website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/dan-brule',
            },
            {
              src: '/projects/tcmbri24-wixsite-com-brittny-richardson-108.png',
              alt: 'Brittny Richardson website homepage',
              websiteUrl: 'https://tcmbri24.wixsite.com/brittny-richardson',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-nelly-ortiz-109.png',
              alt: 'Nelly Ortiz website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/nelly-ortiz',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-steve-drabek-110.png',
              alt: 'Steve Drabek website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/steve-drabek',
            },
            {
              src: '/projects/wix-showcase-2.svg',
              alt: 'Jen Rogers website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jen-rogers',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-alexis-king-112.png',
              alt: 'Alexis King website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/alexis-king',
            },
            {
              src: '/projects/thespeakerlab-wixsite-com-jim-best-113.png',
              alt: 'Jim Best website homepage',
              websiteUrl: 'https://thespeakerlab.wixsite.com/jim-best',
            },
          ],
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

