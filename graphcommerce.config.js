// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  robotsAllow: false,
  limitSsg: true,

  ...(process.env.VERCEL_BUILD_FOR_HYGRAPH_REQUIRED === 'true'
    ? { hygraphEndpoint: 'example' }
    : {}),
  // magentoEndpoint: 'https://configurator.reachdigital.dev/graphql',
  magentoEndpoint: 'https://srv900162.hstgr.cloud/graphql',
  // magentoEndpoint: 'https://srv900162.hstgr.cloud/graphql',
  // magentoVersion: 247,
  magentoVersion: 248,
  canonicalBaseUrl: 'https://graphcommerce.vercel.app',
  hygraphEndpoint: 'nokeys',
  storefront: [
    {
      locale: 'en',
      magentoStoreCode: 'default',
      defaultLocale: true,
      googleAnalyticsId: undefined,
      googleRecaptchaKey: undefined,
    },
    // {
    //   locale: 'nl',
    //   magentoStoreCode: 'nl_NL',

    //   // robotsAllow: false,
    //   // permissions: { cart: 'DISABLED', checkout: 'DISABLED', customerAccount: 'DISABLED' },
    // },
  ],
  recentlyViewedProducts: { enabled: true },
  productFiltersPro: true,
  productFiltersLayout: 'SIDEBAR',
  // previewSecret: '123',

  // compare: true,
  // compareVariant: 'ICON',
  // customerDeleteEnabled: false,

  // permissions: { cart: 'ENABLED', checkout: 'ENABLED', customerAccount: 'ENABLED' },
  // customerCompanyFieldsEnable: false,
  // customerAddressNoteEnable: false,
  // enableGuestCheckoutLogin: false,
  // dataLayer: { coreWebVitals: false },
  // wishlistHideForGuests: true,

  // googleAnalyticsId: undefined,
  // googlePlaystore: undefined,
  // googleRecaptchaKey: undefined,
  // googleTagmanagerId: undefined,

  // configurableVariantForSimple: true,
  // configurableVariantValues: { content: true, gallery: true, url: true },

  // containerSizingContent: 'FULL_WIDTH',
  // containerSizingShell: 'FULL_WIDTH',
  // demoMode: true,
  // breadcrumbs: false,
}

module.exports = config
