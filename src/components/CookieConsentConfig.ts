import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {
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
    functionality: {},
    analytics: {},
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "We use cookies for preferences and statistics",
          description:
            'This web site uses cookies to save your preferences and to collect and store statistics about how visitors use the website.',
          acceptAllBtn: 'Accept all',
          showPreferencesBtn: 'Manage preferences',
          footer:
          '<a href="/cookies/">Cookie Policy</a>',
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
              title: 'Cookie Usage',
              description:
                'This web site uses cookies to save your preferences and to collect and store statistics about how visitors use the website.\
                For more information, see our <a href="/cookies/">Cookie Policy</a>.',
            },
            {
              title:
                'Your cookie preference <span class="pm__badge">Always Enabled</span>',
              description:
                'A cookie is used to remember whether you prefer to accept or reject other cookies. Without this, the cookie messages would keep appearing. This cookie is not observed by the web server.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Google Analytics Cookies',
              description:
                'Google Analytics uses a cookie to collect and store data about how visitors use the website. This data is anonymous and agregated. If you prefer your visit to be excluded from statistics, you may disable Google Analytics cookies.',
              linkedCategory: 'analytics',
            },
          ],
        },
      },
    },
  },
};
