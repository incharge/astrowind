import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  // \u2315 is the magnifying glass character to indicate search
  // \u202f is a non-breaking space
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Subscribe',
      href: getPermalink('/subscribe'),
    },
    {
      text: 'Episodes',
      href: getBlogPermalink(''),
    },
    {
      text: '\u2315\u202fSearch',
      href: getPermalink('/search'),
    },
  ],
  actions: [{ text: 'Support the podcast', href: getPermalink('/support') }],
};

export const footerData = {
  socialLinks: [
    { text: 'Email', href: "mailto:dissenteryt@gmail.com", icon: "tabler:mail" },
    { text: 'Twitter', href: "https://twitter.com/TheDissenterYT", icon: "tabler:brand-x" },
    { text: 'Facebook', href: "https://www.facebook.com/thedissenteryt/", icon: "tabler:brand-facebook" },
  ],
  footNote: `
    Copyright Ricardo Lopes · All rights reserved.
  `,
};
