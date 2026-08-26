'use strict';

const PUBLIC_ACTIONS = {
  'site-setting': ['find'],
  hero: ['find'],
  service: ['find', 'findOne'],
  organisation: ['find', 'findOne'],
  'case-study': ['find', 'findOne'],
  'blog-post': ['find', 'findOne'],
  book: ['find', 'findOne'],
  'contact-submission': ['create'],
};

async function setPublicPermissions({ strapi }) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const [uid, actions] of Object.entries(PUBLIC_ACTIONS)) {
    for (const action of actions) {
      const actionId = `api::${uid}.${uid}.${action}`;
      const existing = await strapi.query('plugin::users-permissions.permission').findOne({
        where: { action: actionId, role: publicRole.id },
      });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action: actionId, role: publicRole.id },
        });
      }
    }
  }
}

module.exports = { setPublicPermissions };
