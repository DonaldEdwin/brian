import type { Schema, Struct } from '@strapi/strapi';

export interface SharedFocusArea extends Struct.ComponentSchema {
  collectionName: 'components_shared_focus_areas';
  info: {
    displayName: 'Focus Area';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['linkedin', 'x', 'facebook', 'instagram', 'youtube']
    >;
    url: Schema.Attribute.String;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Stat';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.focus-area': SharedFocusArea;
      'shared.social-link': SharedSocialLink;
      'shared.stat': SharedStat;
    }
  }
}
