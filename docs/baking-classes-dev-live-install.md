# Baking Classes Dev live install notes

Extract this ZIP at the root of the `ribbon-n-cake` frontend repository.

Included frontend paths:

- `pages/baking-classes-dev/index.tsx`
- `components/BakingClassesDev/`
- `public/images/baking-classes-dev/`
- `pages/api/alekseon-form.ts`
- `lib/magentoGraphqlEndpoint.ts`
- `lib/decorCelebrationCms.ts`

Magento backend setup required:

1. Create or update CMS page identifier: `baking-classes-dev`
2. Paste the HTML from `components/BakingClassesDev/cms-content.html` into the page content.
3. Create the Manage Custom Forms form identifier: `baking-classes-dev-booking`
4. Required form fields:
   - Your Name
   - Your Phone
   - Your Email
   - Class Interested In
   - Number of Attendees
   - Any other details like preferred dates, allergies, birthday party details, number of children...
5. Keep this marker unchanged in the CMS content:
   - `data-baking-custom-form="baking-classes-dev-booking"`

Live endpoint safety:

- The frontend browser calls only relative `/api/alekseon-form`.
- The API route uses a single shared Magento GraphQL endpoint resolver.
- For live, use the existing `magentoEndpoint` from `graphcommerce.config.js`, or set:
  - `ALEKSEON_FORM_MAGENTO_GRAPHQL_URL=https://your-live-magento-domain/graphql`
- Local `rnbmage.local` / `127.0.0.1` is only used for local non-production requests.

After extracting:

```bash
yarn install
yarn tsc:lint
yarn build
```

No commit is included in this package.
