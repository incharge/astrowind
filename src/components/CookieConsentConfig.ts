import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom right',
    },
  },
  categories: {
    functionality: {},
    analytics: {
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          onAccept: () => {
            console.log('ga4 accepted');
            // TODO: load ga4
          },
          onReject: () => {
            console.log('ga4 rejected');
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
      },
    },
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "We use a cookie to collect stats",
          description:
            'This web site uses a cookie to collect and store data about how visitors use the website. This data is anonymous and agregated. You may accept or reject data collection',
          acceptAllBtn: 'Accept',
          acceptNecessaryBtn: 'Reject',
          footer: '<a href="/cookies/">Cookie Policy</a>'
        },
        preferencesModal: { sections: [], },
      },
    },
  },
};
