import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../components'
import { InnerTop } from '../components/shared/Inner/Innertop'
import { cmsMultipleBlocksDocument } from '../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../utils/htmlUtils'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { cmsBlocks?: any }

function RefundPolicyPage(props: CmsBlocksProps) {
  const { cmsBlocks } = props
  const returnPolicyContent = cmsBlocks.find((block) => block.identifier === 'return-policy')
  const decodedReturnPolicyContent = decodeHtmlEntities(returnPolicyContent?.content)

  return (
    <>
      <PageMeta
        title='Refund Policy | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/refund-policy'
      />
      <InnerTop title={'Refund Policy'} isFilter={false} />
      {decodedReturnPolicyContent && (
        <div dangerouslySetInnerHTML={{ __html: decodedReturnPolicyContent }} />
      )}
    </>
  )
}
RefundPolicyPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default RefundPolicyPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: ['return-policy'],
    },
  })

  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items

  return {
    props: {
      ...(await layout).data,
      cmsBlocks,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
