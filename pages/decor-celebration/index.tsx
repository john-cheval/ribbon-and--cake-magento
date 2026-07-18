import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import DecorCelebration from '../../components/DecorCelebration'
import { cmsPageDocument } from '../../graphql/CmsPage.gql'
import { fetchMagentoCmsPage, type DecorCmsPage } from '../../lib/decorCelebrationCms'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

type DecorCelebrationPageProps = LayoutNavigationProps & {
  cmsPage?: DecorCmsPage | null
  cmsContent: string
}

type GetPageStaticProps = GetStaticProps<DecorCelebrationPageProps>

const fallbackContent =
  '<div class="decor-celebration-pagebuilder"><section class="decor-hero"><div class="decor-hero__inner"><div class="decor-hero__copy"><span class="decor-hero__eyebrow">New service - Dubai, UAE</span><h1 class="decor-hero__title"><span>Balloon Decoration</span><span>for Birthdays and</span><span>Celebrations in Dubai.</span></h1><p class="decor-hero__text">We design and install custom balloon setups for birthdays, baby showers, home parties, hospital celebrations and corporate events across Dubai.</p></div></div></section></div>'

function DecorCelebrationPage(props: DecorCelebrationPageProps) {
  const { cmsPage, cmsContent } = props

  return (
    <>
      <PageMeta
        title={
          cmsPage?.meta_title ??
          cmsPage?.title ??
          'Balloon Decoration for Birthdays and Celebrations in Dubai | Ribbons & Balloons'
        }
        metaDescription={
          cmsPage?.meta_description ??
          'Luxury balloon decoration, birthday party setups, baby shower decor, and corporate event balloon services in Dubai.'
        }
        canonical='/decor-celebration'
      />

      <DecorCelebration content={cmsContent} />
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
