'use strict';

const { setPublicPermissions } = require('./bootstrap-permissions');
const { seed } = require('./seed');

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await setPublicPermissions({ strapi });
    await seed({ strapi });
  },
};
