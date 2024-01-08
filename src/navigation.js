import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
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
      text: 'Search',
      href: getPermalink('/search'),
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

// Image files with .svg extension are in src/assets/images/listen
export const listenData = [
  { action: 'Watch ', text: 'YouTube', image: 'youtube', url: 'https://www.youtube.com/@TheDissenterRL', ratio: 159/110 },
  { text: 'Apple Podcasts', image: 'apple', url: 'https://podcasts.apple.com/gb/podcast/the-dissenter/id1451347236' },
  { text: 'Spotify', image: 'spotify', url: 'https://podcasters.spotify.com/pod/show/thedissenter' },
  { text: 'Pocket Casts', image: 'pocketcasts', url: 'https://pca.st/5lfr' },
  { text: 'Overcast', image: 'overcast', url: 'https://overcast.fm/itunes1451347236/the-dissenter' },
  { text: 'RSS', image: 'rss', url: 'https://anchor.fm/s/822ba20/podcast/rss' },
];
