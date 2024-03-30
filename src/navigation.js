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

// Image files with .svg extension are in src/assets/images/listen
export const listenData = [
  { action: 'Watch ', text: 'YouTube', image: 'youtube', url: 'https://www.youtube.com/@TheDissenterRL', ratio: 159/110 },
  { text: 'Apple Podcasts', image: 'apple', url: 'https://podcasts.apple.com/gb/podcast/the-dissenter/id1451347236' },
  { text: 'Spotify', image: 'spotify', url: 'https://podcasters.spotify.com/pod/show/thedissenter' },
  { text: 'Pocket Casts', image: 'pocketcasts', url: 'https://pca.st/5lfr' },
  { text: 'Overcast', image: 'overcast', url: 'https://overcast.fm/itunes1451347236/the-dissenter' },
  { text: 'Audible', image: 'audible', url: 'https://www.audible.co.uk/podcast/The-Dissenter/B0CXJMM9RC' },
  { text: 'RSS', image: 'rss', url: 'https://anchor.fm/s/822ba20/podcast/rss' },
];
