import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { readFile } from 'fs/promises'
import path from 'path'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import BakingClassesDev from '../../components/BakingClassesDev'
import { cmsPageDocument } from '../../graphql/CmsPage.gql'
import { fetchMagentoCmsPage, type DecorCmsPage } from '../../lib/decorCelebrationCms'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

type BakingClassesDevPageProps = LayoutNavigationProps & {
  cmsPage?: DecorCmsPage | null
  cmsContent: string
}

type GetPageStaticProps = GetStaticProps<BakingClassesDevPageProps>

const pageSeo = {
  title: 'Kids Baking Classes Dubai | Ribbons & Balloons',
  description:
    'Hands-on baking classes for kids aged 5–15 in Dubai. Learn cupcakes, cookies, brownies, cakes and more in small guided groups.',
  canonical: '/baking-classes-dev',
}

async function readLocalCmsSeed() {
  return readFile(path.join(process.cwd(), 'components/BakingClassesDev/cms-content.html'), 'utf8').catch(
    () => '',
  )
}

function BakingClassesDevPage(props: BakingClassesDevPageProps) {
  const { cmsContent, cmsPage } = props

  return (
    <>
      <PageMeta
        title={cmsPage?.meta_title || cmsPage?.title || pageSeo.title}
        metaDescription={cmsPage?.meta_description || pageSeo.description}
        metaRobots={['noindex', 'nofollow']}
        canonical={pageSeo.canonical}
      />

      <BakingClassesDev content={cmsContent} />
    </>
  )
}

BakingClassesDevPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default BakingClassesDevPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const localCmsPage = await fetchMagentoCmsPage('baking-classes-dev')
  const cmsPage =
    localCmsPage ??
    (await staticClient
      .query({
        query: cmsPageDocument,
        variables: { urlKey: 'baking-classes-dev' },
        fetchPolicy: 'network-only',
      })
      .then((result) => result.data.cmsPage as DecorCmsPage | null)
      .catch(() => null))
  const cmsContent = decodeHtmlEntities(cmsPage?.content || (await readLocalCmsSeed()))

  return {
    props: {
      ...(await layout).data,
      cmsPage,
      cmsContent,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
