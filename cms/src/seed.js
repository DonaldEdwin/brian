'use strict';

async function seedSiteSetting({ strapi }) {
  const existing = await strapi.query('api::site-setting.site-setting').findOne({});
  if (existing) return;

  await strapi.documents('api::site-setting.site-setting').create({
    data: {
      siteName: 'Brian Gakere',
      tagline: 'It Can Be Done. It Must Be Done.',
      contactEmail: 'contact@briangakere.com',
      contactPhone: '+254768222006',
      socialLinks: [
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/gakere-nyingi/' },
        { platform: 'x', url: 'https://x.com/Gakerenyingi' },
        { platform: 'facebook', url: 'https://www.facebook.com/briangakerenyingi' },
      ],
    },
  });
}

async function seedHero({ strapi }) {
  const existing = await strapi.query('api::hero.hero').findOne({});
  if (existing) return;

  await strapi.documents('api::hero.hero').create({
    data: {
      heading: "I'm Passionate about AI, Emerging Technologies, and The Kingdom",
      subheading: 'It Can Be Done. It Must Be Done.',
      stats: [
        { label: 'People Trained', value: '200+' },
        { label: 'Organisations Served', value: '50+' },
      ],
    },
  });
}

const SERVICES = [
  {
    title: 'AI Solutions',
    description:
      'I design and build custom AI tools, chatbots, and automations that solve specific challenges in your business, organisation, or institution. From automating repetitive tasks to improving workflows and decision-making, our solutions are built around what you actually need. You get practical systems that work in the background, save time, reduce manual work, improve efficiency, and allow your team to focus on higher-value work.',
    order: 1,
  },
  {
    title: 'AI Training',
    description:
      'I train individuals and teams to use AI confidently and effectively in their actual line of work. Rather than focusing on generic AI theory, training is built around the tools, workflows, and tasks you already handle. You learn how to save time, improve productivity, work smarter, and get better results by integrating AI into your everyday work.',
    order: 2,
  },
  {
    title: 'Mentorship and Coaching',
    description:
      'I mentor and coach students, educators, emerging leaders, and professionals to understand how artificial intelligence is transforming jobs, careers, education, and society. Through mentorship, webinars, workshops, and practical exposure to emerging technologies, I help people think critically, adapt to change, discover opportunities, build future-ready skills, and use AI responsibly and creatively.',
    order: 3,
  },
  {
    title: 'Teaching',
    description:
      'Through teaching, writing, and speaking, I help people think deeply, live intentionally, and use their gifts with purpose. Grounded in Kingdom principles, my teaching connects faith, intellect, character, leadership, and everyday life, helping people develop not only what they know, but who they are and how they influence others.',
    order: 4,
  },
];

async function seedServices({ strapi }) {
  const count = await strapi.documents('api::service.service').count({});
  if (count > 0) return;

  for (const service of SERVICES) {
    await strapi.documents('api::service.service').create({
      data: service,
      status: 'published',
    });
  }
}

const ORGANISATIONS = [
  {
    name: 'Online Ecclesia',
    tagline: 'A Community of Faith & Intellect',
    description:
      'Online Ecclesia is a Christian community that brings believers from different spheres of influence together to grow in faith, deepen their understanding of Scripture, and live out their calling.',
    focusAreas: [
      { text: 'Bible study & spiritual growth' },
      { text: 'Faith & intellectual development' },
      { text: 'Purpose, leadership & influence' },
      { text: 'Equipping believers for Kingdom impact' },
    ],
  },
  {
    name: 'Ujuzi Global',
    tagline: 'Empowering People Through Skills, Technology & Opportunity',
    description:
      'Ujuzi Global is an organisation focused on equipping individuals and organisations with practical skills, knowledge, and opportunities to thrive in a rapidly changing world. Through training, mentorship, and practical learning experiences, Ujuzi Global helps people develop relevant skills, embrace emerging technologies, and turn knowledge into real-world opportunities.',
    focusAreas: [
      { text: 'Skills development & professional training' },
      { text: 'Technology & digital skills' },
      { text: 'Mentorship & career development' },
      { text: 'Practical learning & capacity building' },
    ],
  },
];

async function seedOrganisations({ strapi }) {
  const count = await strapi.documents('api::organisation.organisation').count({});
  if (count > 0) return;

  for (const org of ORGANISATIONS) {
    await strapi.documents('api::organisation.organisation').create({
      data: org,
      status: 'published',
    });
  }
}

const CASE_STUDIES = [
  {
    clientName: '[Placeholder] Regional SACCO',
    problem: 'Staff spent hours a week manually answering repetitive member queries.',
    solution: 'Built and deployed a custom AI chatbot trained on their policies and FAQs.',
    result: 'Cut response time by 70% and freed staff for higher-value member support.',
  },
  {
    clientName: '[Placeholder] Training Institute',
    problem: 'Faculty had no structured way to introduce AI tools into their curriculum.',
    solution: 'Ran a hands-on AI training program tailored to each department\'s workflows.',
    result: 'Over 80 staff trained, with AI tools now part of day-to-day teaching.',
  },
  {
    clientName: '[Placeholder] Community Church Network',
    problem: 'Leadership struggled to onboard new leaders consistently across branches.',
    solution: 'Designed a mentorship and coaching pathway grounded in Kingdom principles.',
    result: 'Standardized leadership formation across 6 branches within one year.',
  },
];

async function seedCaseStudies({ strapi }) {
  const count = await strapi.documents('api::case-study.case-study').count({});
  if (count > 0) return;

  for (const cs of CASE_STUDIES) {
    await strapi.documents('api::case-study.case-study').create({
      data: cs,
      status: 'published',
    });
  }
}

const BLOG_POSTS = [
  {
    title: '[Placeholder] Where AI Actually Saves You Time',
    slug: 'placeholder-where-ai-actually-saves-you-time',
    excerpt: 'A practical look at which everyday tasks are worth automating first, and which aren\'t.',
    body: 'This is placeholder body content. Replace it with a real post in the Strapi admin.',
    category: 'AI',
    readTime: '5 min read',
  },
  {
    title: '[Placeholder] Character Before Capability',
    slug: 'placeholder-character-before-capability',
    excerpt: 'Why the "why" behind your work matters more than the tools you use to do it.',
    body: 'This is placeholder body content. Replace it with a real post in the Strapi admin.',
    category: 'Kingdom Principles',
    readTime: '4 min read',
  },
  {
    title: '[Placeholder] A Simple Framework for AI Adoption',
    slug: 'placeholder-a-simple-framework-for-ai-adoption',
    excerpt: 'A three-step approach institutions can use to introduce AI without overwhelming staff.',
    body: 'This is placeholder body content. Replace it with a real post in the Strapi admin.',
    category: 'Training',
    readTime: '6 min read',
  },
];

async function seedBlogPosts({ strapi }) {
  const count = await strapi.documents('api::blog-post.blog-post').count({});
  if (count > 0) return;

  for (const post of BLOG_POSTS) {
    await strapi.documents('api::blog-post.blog-post').create({
      data: post,
      status: 'published',
    });
  }
}

const BOOKS = [
  {
    title: '[Placeholder] It Can Be Done',
    description: 'A placeholder book entry. Replace with a real title, cover, and description.',
  },
  {
    title: '[Placeholder] The Kingdom and the Machine',
    description: 'A placeholder book entry. Replace with a real title, cover, and description.',
  },
  {
    title: '[Placeholder] Think Deeply, Live Intentionally',
    description: 'A placeholder book entry. Replace with a real title, cover, and description.',
  },
];

async function seedBooks({ strapi }) {
  const count = await strapi.documents('api::book.book').count({});
  if (count > 0) return;

  for (const book of BOOKS) {
    await strapi.documents('api::book.book').create({
      data: book,
      status: 'published',
    });
  }
}

async function seed({ strapi }) {
  await seedSiteSetting({ strapi });
  await seedHero({ strapi });
  await seedServices({ strapi });
  await seedOrganisations({ strapi });
  await seedCaseStudies({ strapi });
  await seedBlogPosts({ strapi });
  await seedBooks({ strapi });
}

module.exports = { seed };
