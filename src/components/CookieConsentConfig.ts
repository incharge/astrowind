import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {
  cookie: {
      name: 'cookie_consent',
      expiresAfterDays: 365,
      useLocalStorage: true,
  },
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom right',
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    player: {
      enabled: true,
    },
    analytics: {
      enabled: true,
    },
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "We use cookies for statistics.  We use local storage for preferences.",
          description:
            'This web site uses cookies to collect and store statistics about how visitors use the website.  Your preferences, such as whether you prefer audio or video, are stored locally on your device without using cookies and are never transmitted over the Internet.',
          acceptAllBtn: 'Accept all',
          showPreferencesBtn: 'Manage preferences',
          footer:
          '<a href="/cookies/">Cookie Policy</a>',
          closeIconLabel: 'x',
        },
        preferencesModal: {
          title: 'Consent Preferences Center',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie and local storage usage',
              description:
                'This web site uses cookies to collect and store statistics about how visitors use the website.  Your preferences, such as whether you prefer audio or video, are stored locally on your device without using cookies and are never transmitted over the Internet.\
                For more information, see our <a href="/cookies/">Cookie Policy</a>.',
            },
            {
              title:
                'Your cookie preference <span class="pm__badge">Always Enabled</span>',
              description:
                'Your cookie preferences are saved in local storage on your device and are not transmitted over the internet. Otherwise this cookie messages would keep appearing.',
              linkedCategory: 'necessary',
            },
            {
              title:
                'Media player preferences',
              description:
                'You can choose to listen to podcast episodes as audio or watch the video too. Your choice is stored locally on your device without using cookies. If you disable this option, then every time you go to another page, your choice is lost and the player options revert to the default.',
              linkedCategory: 'player',
            },
            {
              title: 'Google Analytics uses cookies',
              description:
                'Google Analytics uses cookies to collect and store data about how visitors use the website. This data is anonymous and agregated.',
              linkedCategory: 'analytics',
            },
          ],
        },
      },
    },
  },
};
