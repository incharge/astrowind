import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Episodes',
      href: getBlogPermalink(''),
    },
  ],
  actions: [{ text: 'Support the podcast', href: getPermalink('/support') }],
};

export const footerData = {
  socialLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  footNote: `
    Copyright Ricardo Lopes · All rights reserved.
  `,
};
