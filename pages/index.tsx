import Head from 'next/head'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { ProductListDocument } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { PageMeta } from '@graphcommerce/next-ui'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation } from '../components'
import { HomePage } from '../components/Home'
import { cmsMultipleBlocksDocument } from '../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../utils/htmlUtils'

export type CmsBlocksProps = { cmsBlocks?: any; layoutData?: any; menu?: any }

export type StoryProductsProps = {
  justInProducts?: any[]
  statementCakesProducts: any[]
}

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

export type CmsPageRouteProps = LayoutNavigationProps & CmsBlocksProps & StoryProductsProps

function CmsPage(props: CmsPageRouteProps) {
  const { cmsBlocks, justInProducts, menu, statementCakesProducts } = props
  const homesHeroData = cmsBlocks.find((block) => block.identifier === 'slider')
  const justInHome = cmsBlocks.find((block) => block.identifier === 'just-in-home')
  const homeStoryData = cmsBlocks.find((block) => block.identifier === 'home-story-title')
  const homeOccasionsData = cmsBlocks.find((block) => block.identifier === 'home-occasion-title')
  const homeMinibytsData = cmsBlocks.find((block) => block.identifier === 'home-mini-bytes')
  const homeCollectionsData = cmsBlocks.find((block) => block.identifier === 'home-collections')
  const homeCtaData = cmsBlocks.find((block) => block.identifier === 'home-cta')
  const homeCeleberationsData = cmsBlocks.find((block) => block.identifier === 'home-celeberation')
  const homeImaginationData = cmsBlocks.find((block) => block.identifier === 'home-imagination')

  const decodedHomeHero = decodeHtmlEntities(homesHeroData?.content)
  const decodedHomeHeroJustIn = decodeHtmlEntities(justInHome?.content)
  const decodedHomeStory = decodeHtmlEntities(homeStoryData?.content)
  const decodedHomeOccasions = decodeHtmlEntities(homeOccasionsData?.content)
  const decodedHomeMinibyts = decodeHtmlEntities(homeMinibytsData?.content)
  const decodedHomeCollections = decodeHtmlEntities(homeCollectionsData?.content)
  const decodedHomeCta = decodeHtmlEntities(homeCtaData?.content)
  const decodedHomeCeleberations = decodeHtmlEntities(homeCeleberationsData?.content)
  const decodedHomeImagination = decodeHtmlEntities(homeImaginationData?.content)
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.rnbcakes.com/#organization',
        name: 'Ribbons & Balloons',
        alternateName: 'RNB Cakes',
        url: 'https://www.rnbcakes.com/',
        logo: 'https://srv900162.hstgr.cloud/media/.renditions/wysiwyg/cns-apge/footer/footer_logo.png',
        description:
          'Eggless cake shop in Dubai for birthdays, celebrations and gifting. Order fresh eggless cakes, custom designs, plus vegan and gluten-free, delivered citywide.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+971528899029',
          contactType: 'customer service',
          areaServed: 'AE',
        },
        sameAs: ['https://www.instagram.com/ribbonsandballoonsbakery/'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.rnbcakes.com/#website',
        url: 'https://www.rnbcakes.com/',
        name: 'Ribbons & Balloons',
        publisher: { '@id': 'https://www.rnbcakes.com/#organization' },
      },
      {
        '@type': 'Bakery',
        '@id': 'https://www.rnbcakes.com/#bakery-oud-metha',
        name: 'Ribbons & Balloons - Oud Metha',
        parentOrganization: { '@id': 'https://www.rnbcakes.com/#organization' },
        url: 'https://www.rnbcakes.com/',
        image:
          'https://srv900162.hstgr.cloud/media/.renditions/wysiwyg/cns-apge/footer/footer_logo.png',
        telephone: '+97142698623',
        priceRange: '$$',
        currenciesAccepted: 'AED',
        paymentAccepted: 'Cash, Visa, Mastercard',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop No. 5, 8th Street, Oud Metha',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 25.2376178, longitude: 55.3059131 },
        hasMap: 'https://maps.app.goo.gl/51NCwzXfyTTK5Aw19',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '23:00',
          },
        ],
        sameAs: ['https://www.instagram.com/ribbonsandballoonsbakery/'],
      },
      {
        '@type': 'Bakery',
        '@id': 'https://www.rnbcakes.com/#bakery-studio-city',
        name: 'Ribbons & Balloons - Studio City',
        parentOrganization: { '@id': 'https://www.rnbcakes.com/#organization' },
        url: 'https://www.rnbcakes.com/',
        image:
          'https://srv900162.hstgr.cloud/media/.renditions/wysiwyg/cns-apge/footer/footer_logo.png',
        telephone: '+971524898141',
        priceRange: '$$',
        currenciesAccepted: 'AED',
        paymentAccepted: 'Cash, Visa, Mastercard',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Dubai Studio City',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 25.0408714, longitude: 55.2464491 },
        hasMap: 'https://maps.app.goo.gl/uKagVd2v7a3BQbtx8',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '23:00',
          },
        ],
        sameAs: ['https://www.instagram.com/ribbonsandballoonsbakery/'],
      },
      {
        '@type': 'Bakery',
        '@id': 'https://www.rnbcakes.com/#bakery-al-qusais',
        name: 'Ribbons & Balloons - Al Qusais',
        parentOrganization: { '@id': 'https://www.rnbcakes.com/#organization' },
        url: 'https://www.rnbcakes.com/',
        image:
          'https://srv900162.hstgr.cloud/media/.renditions/wysiwyg/cns-apge/footer/footer_logo.png',
        telephone: '+971528483368',
        priceRange: '$$',
        currenciesAccepted: 'AED',
        paymentAccepted: 'Cash, Visa, Mastercard',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Inside Royal Medcare Hospital, 16 18th Street, Al Qusais 2',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 25.267828, longitude: 55.3862615 },
        hasMap: 'https://maps.app.goo.gl/AkX9yHAFhzbuRdD48',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '23:00',
          },
        ],
        sameAs: ['https://www.instagram.com/ribbonsandballoonsbakery/'],
      },
      {
        '@type': 'Bakery',
        '@id': 'https://www.rnbcakes.com/#bakery-barsha-heights',
        name: 'Ribbons & Balloons - Barsha Heights',
        parentOrganization: { '@id': 'https://www.rnbcakes.com/#organization' },
        url: 'https://www.rnbcakes.com/',
        image:
          'https://srv900162.hstgr.cloud/media/.renditions/wysiwyg/cns-apge/footer/footer_logo.png',
        telephone: '+971588238753',
        priceRange: '$$',
        currenciesAccepted: 'AED',
        paymentAccepted: 'Cash, Visa, Mastercard',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Inside Grosvenor Business Tower, Barsha Heights',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 25.0994167, longitude: 55.1776793 },
        hasMap: 'https://maps.app.goo.gl/yeFUpWe48KP7hpga8',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '23:00',
          },
        ],
        sameAs: ['https://www.instagram.com/ribbonsandballoonsbakery/'],
      },
    ],
  }

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
      </Head>
      <PageMeta
        title='Cakes &amp; Custom Desserts | Dubai Online Bakery'
        metaDescription='Order handcrafted cakes, vegan &amp; gluten-free treats, brownies and personalized desserts in Dubai. Celebrate birthdays, weddings &amp; special moments with RNB Cakes!'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/'
      />

      <HomePage
        Categories={menu?.items[0]?.children}
        justInProductList={justInProducts}
        justinHeading={decodedHomeHeroJustIn}
        statementProducts={statementCakesProducts}
        storyTitle={decodedHomeStory}
        occasionTitle={decodedHomeOccasions}
        miniBytesTitle={decodedHomeMinibyts}
        CollectionSectionData={decodedHomeCollections}
        homeCta={decodedHomeCta}
        homeCeleberate={decodedHomeCeleberations}
        homeImagination={decodedHomeImagination}
        homeHeroData={decodedHomeHero}
      />
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  // const url = (await conf).data.storeConfig?.cms_home_page ?? 'home'

  // const cmsPageQuery = staticClient.query({
  //   query: cmsPageDocument,
  //   variables: {
  //     urlKey: url,
  //   },
  // })

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: [
        'slider',
        'just-in-home',
        'home-story-title',
        'home-occasion-title',
        'home-mini-bytes',
        'home-collections',
        'home-cta',
        'home-imagination',
        'home-celeberation',
        'just-in-home-categoryid',
      ],
    },
  })

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  // const JustInQuery = await staticClient.query({
  //   query: ProductListDocument,
  //   variables: {
  //     pageSize: 10,
  //     currentPage: 1,
  //     filters: {
  //       category_id: { eq: '3' },
  //     },
  //   },
  // })

  const statementCakesQuery = await staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 10,
      currentPage: 1,
      filters: {
        category_id: { eq: '22' },
      },
    },
  })

  // const result = await cmsPageQuery
  // const cmsPage = result.data.cmsPage
  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items
  // const justInProducts = (await JustInQuery).data?.products?.items
  const statementCakesProducts = (await statementCakesQuery).data.products?.items
  const layoutData = (await layout)?.data
  const justInHomecategory = cmsBlocks?.find((block) => block?.identifier === 'just-in-home-categoryid')

  const idCategory = justInHomecategory?.title ? justInHomecategory?.title : '3'

  const JustInQuery = await staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 10,
      currentPage: 1,
      filters: {
        category_id: { eq: idCategory },
      },
    },
  })
  const justInProducts = (await JustInQuery).data?.products?.items
  return {
    props: {
      // cmsPage: cmsPage,
      cmsBlocks,
      justInProducts,
      statementCakesProducts,
      ...(await layout).data,
      layoutData,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
