import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import DecorCelebrationDev from '../../components/DecorCelebrationDev'
import { cmsPageDocument } from '../../graphql/CmsPage.gql'
import { fetchMagentoCmsPage, type DecorCmsPage } from '../../lib/decorCelebrationCms'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

type DecorCelebrationPageProps = LayoutNavigationProps & {
  cmsPage?: DecorCmsPage | null
  cmsContent: string
}

type GetPageStaticProps = GetStaticProps<DecorCelebrationPageProps>

const decorSeo = {
  title: 'Balloon Decoration Dubai | Custom Setups for Every Event',
  description:
    'Custom balloon decoration in Dubai for birthdays, baby showers & corporate events. Full setup & takedown included. Get a free quote for your event today.',
  canonical: '/decor-celebration',
  url: 'https://www.rnbcakes.com/decor-celebration',
  image: 'https://www.rnbcakes.com/images/decor-celebration-dev/hero-red-curtain-balloon.png',
  imageAlt: 'Colorful balloon decoration setup Dubai - birthday and event balloons',
}

const faqItems = [
  {
    question: 'How much does balloon decoration cost in Dubai?',
    answer:
      "Pricing depends on the size of the setup, balloon type (latex vs. organic garland vs. foil), and venue. Share your event details through our quote form and we'll send a customized price within 24 hours.",
  },
  {
    question: 'Do you provide setup and takedown, or do I need to arrange that myself?',
    answer:
      "Setup and takedown are included in every booking. Our team installs everything before your event and removes it after you don't need to manage any logistics.",
  },
  {
    question: 'How far in advance should I book balloon decoration?',
    answer:
      'We recommend booking at least 5-7 days in advance, especially for weekends and festive seasons like Eid and Diwali. Last-minute bookings may be possible depending on availability. Contact us to check.',
  },
  {
    question: 'Which areas in Dubai do you cover?',
    answer:
      'We provide balloon decoration services across Dubai, including homes, hotels, malls, banquet halls, and corporate offices.',
  },
  {
    question: 'Can you match balloon colours to my event theme?',
    answer:
      "Yes, of course. Every setup is custom designed to your chosen colour palette, theme, and venue. We don't use fixed templates.",
  },
  {
    question: 'Do you do balloon decorations for corporate events?',
    answer:
      'Yes, we design brand-matched balloon setups for product launches, office parties, and corporate activations, including setups in your brand colours and logo placement where applicable.',
  },
  {
    question: 'What types of balloon setups do you offer?',
    answer:
      'We offer balloon arches, garlands, backdrops, entrance frames, ceiling installations, number/letter marquees, and themed setups for birthdays, baby showers, gender reveals, and festive occasions.',
  },
  {
    question: 'How do I book?',
    answer:
      "Fill out the quote form with your event details, theme, and date. We'll send a customized quotation, and once you confirm, we lock in your booking and handle the rest.",
  },
]

const decorJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${decorSeo.url}#business`,
    name: 'Ribbons & Balloons',
    url: 'https://www.rnbcakes.com/',
    image: decorSeo.image,
    description: decorSeo.description,
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${decorSeo.url}#service`,
    name: 'Balloon Decoration Dubai',
    serviceType: 'Custom balloon decoration and event balloon setup',
    url: decorSeo.url,
    image: decorSeo.image,
    description: decorSeo.description,
    provider: {
      '@id': `${decorSeo.url}#business`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Balloon Decoration Services',
      itemListElement: [
        'Birthday Party Setups',
        'Baby Shower & Gender Reveals',
        'Home Party & Private Celebrations',
        'Corporate Events & Brand Activation',
        'Festive & Seasonal Balloon Decor',
        'Hospital Celebrations',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
        },
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.rnbcakes.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Balloon Decoration Dubai',
        item: decorSeo.url,
      },
    ],
  },
]

const fallbackContent =
  '<div class="decor-celebration-pagebuilder"><section class="decor-hero"><div class="decor-hero__inner"><div class="decor-hero__copy"><h1 class="decor-hero__title"><span>Balloon Decoration and</span><span>Celebration in Dubai</span></h1><p class="decor-hero__text">We design and install custom balloon setups for birthdays, baby showers, home parties, hospital celebrations and corporate events across Dubai.</p></div></div></section></div>'

function DecorCelebrationPage(props: DecorCelebrationPageProps) {
  const { cmsContent } = props

  return (
    <>
      <PageMeta
        title={decorSeo.title}
        metaDescription={decorSeo.description}
        metaRobots={['max-image-preview:large']}
        canonical={decorSeo.canonical}
        ogImage={decorSeo.image}
        ogType='website'
      >
        <meta property='og:site_name' content='Ribbons & Balloons' />
        <meta property='og:image:alt' content={decorSeo.imageAlt} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={decorSeo.title} />
        <meta name='twitter:description' content={decorSeo.description} />
        <meta name='twitter:image' content={decorSeo.image} />
        <meta name='twitter:image:alt' content={decorSeo.imageAlt} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(decorJsonLd) }}
        />
      </PageMeta>

      <DecorCelebrationDev content={cmsContent} />
    </>
  )
}

DecorCelebrationPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default DecorCelebrationPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const localCmsPage = await fetchMagentoCmsPage('decor-celebration')
  const cmsPage =
    localCmsPage ??
    (await staticClient
      .query({
        query: cmsPageDocument,
        variables: { urlKey: 'decor-celebration' },
        fetchPolicy: 'network-only',
      })
      .then((result) => result.data.cmsPage as DecorCmsPage | null)
      .catch(() => null))
  const cmsContent = decodeHtmlEntities(cmsPage?.content ?? fallbackContent)

  return {
    props: {
      ...(await layout).data,
      cmsPage,
      cmsContent,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
