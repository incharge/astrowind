import fs from 'fs';
import yaml from 'js-yaml';
import merge from 'lodash.merge';

import type { MetaData } from '~/types';

export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: boolean;
  googleSiteVerificationId?: string;
}
export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string;
    template: string;
  };
}
export interface I18NConfig {
  language: string;
  textDirection: string;
  dateFormatter?: Intl.DateTimeFormat;
}
export interface AppBlogConfig {
  isEnabled: boolean;
  postsPerPage: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string;
      partytown?: boolean;
      vanillacookieconsent?: boolean;
    };
  };
}

const config = yaml.load(fs.readFileSync('src/config.yaml', 'utf8')) as {
  site?: SiteConfig;
  metadata?: MetaDataConfig;
  i18n?: I18NConfig;
  apps?: {
    blog?: AppBlogConfig;
  };
  ui?: unknown;
  analytics?: unknown;
};

const DEFAULT_SITE_NAME = 'Website';

const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: '/',
    trailingSlash: false,

    googleSiteVerificationId: '',
  };

  // inCharge: in dev mode, set the site and base URL from environment variables
  const devSiteConfig =
    import.meta.env.DEV ? {
      site: import.meta.env.VITE_SITE,
      base: import.meta.env.VITE_BASE
    } as SiteConfig : {};
  
  return merge({}, _default, (config?.site ?? {}), devSiteConfig) as SiteConfig;
};

const getMetadata = () => {
  const siteConfig = getSite();

  const _default = {
    title: {
      default: siteConfig?.name || DEFAULT_SITE_NAME,
      template: '%s',
    },
    description: '',
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'website',
    },
  };

  // inCharge: in dev mode, tell robots not to index the site
  const devMetadata =
    import.meta.env.DEV ? {
      robots: {
        index: false,
        follow: false  
      }
    } as MetaDataConfig : {};

  return merge({}, _default, config?.metadata ?? {}, devMetadata) as MetaDataConfig;
};

const getI18N = () => {
  const _default = {
    language: 'en',
    textDirection: 'ltr',
  };

  const value = merge({}, _default, config?.i18n ?? {});

  return Object.assign(value, {
    dateFormatter: new Intl.DateTimeFormat(value.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
  }) as I18NConfig;
};

const getAppBlog = () => {
  const _default = {
    isEnabled: false,
    postsPerPage: 6,
    post: {
      isEnabled: true,
      permalink: '/blog/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'blog',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'tag',
      robots: {
        index: false,
        follow: true,
      },
    },
  };

  // inCharge: in dev mode, tell robots not to index the blog
  const devAppBlogConfig = import.meta.env.DEV ?
  {
    post: {
      robots: {
        index: false,
        follow: false,
      },
    },
    list: {
      robots: {
        index: false,
        follow: false,
      },
    },
    category: {
      robots: {
        index: false,
        follow: false,
      },
    },
    tag: {
      robots: {
        index: false,
        follow: false,
      },
    },
  } as AppBlogConfig
  : {};

  return merge({}, _default, config?.apps?.blog ?? {}, {}) as AppBlogConfig;
};

const getUI = () => {
  const _default = {
    theme: 'system',
    classes: {},
    tokens: {},
  };

  return merge({}, _default, config?.ui ?? {});
};

const getAnalytics = () => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
        vanillacookieconsent: false,
      },
    },
  };

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig;
};

// Define the expected format of the src/playlists.yaml file
interface Tags extends Array<{
  id: string,
  title: string,
  count: number
}>{};
// Alternatively, as a dict:
// export interface Tags {  [id: number]: {    id: string,    title: string,    count: number  };};
// then: Object.values(categories).forEach(tags => {

// Get an array of the titles of non-empty tags
const getTags = () => {
  const tags: Tags = yaml.load(fs.readFileSync('src/playlists.yaml', 'utf8')) as Tags;
  const tagsTitles: string[] = [];
  tags.forEach(tag => {
    const tagName = tag['title'];
    if ( !tagsTitles.includes(tagName) )
      tagsTitles.push(tagName);
  });
  tagsTitles.sort();
  return tagsTitles;
};
export const TAGS = getTags();
export const CATEGORIES = [];

export const SITE = getSite();
export const I18N = getI18N();
export const METADATA = getMetadata();
export const APP_BLOG = getAppBlog();
export const UI = getUI();
export const ANALYTICS = getAnalytics();

export interface PodcastPlatform {
	action?: string
	text: string
	image: string
	url: string
	ratio?: number
};

export interface PodcastPlatforms extends Array<PodcastPlatform>{};

// Image files with .svg extension are in src/assets/images/listen
export const podcastPlatforms: PodcastPlatforms = [
  { action: 'Watch ', text: 'YouTube', image: 'youtube', url: 'https://www.youtube.com/@TheDissenterRL', ratio: 159/110 },
  { text: 'Apple Podcasts', image: 'apple', url: 'https://podcasts.apple.com/gb/podcast/the-dissenter/id1451347236' },
  { text: 'Spotify', image: 'spotify', url: 'https://podcasters.spotify.com/pod/show/thedissenter' },
  { text: 'Pocket Casts', image: 'pocketcasts', url: 'https://pca.st/5lfr' },
  { text: 'Overcast', image: 'overcast', url: 'https://overcast.fm/itunes1451347236/the-dissenter' },
  { text: 'Audible', image: 'audible', url: 'https://www.audible.co.uk/podcast/The-Dissenter/B0CXJMM9RC' },
  { text: 'RSS', image: 'rss', url: 'https://anchor.fm/s/822ba20/podcast/rss' },
];
