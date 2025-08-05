import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import Contact from '../../components/contact'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { cmsBlocks?: any }
function ContactPage(props: CmsBlocksProps) {
  const { cmsBlocks } = props

  const contactLeft = cmsBlocks.find((block) => block.identifier === 'contact-left')
  const decodedContactLeft = decodeHtmlEntities(contactLeft?.content)
  return (
    <>
      <PageMeta
        title='Contact | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/Contact'
      />

      <InnerTop title={'Contact'} isFilter={false} />

      <Contact contactLeft={decodedContactLeft} />
    </>
  )
}

ContactPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ContactPage

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
      blockIdentifiers: ['contact-left'],
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
