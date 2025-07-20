import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, flushMeasurePerf, PrivateQueryMaskProvider } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle, PageMeta } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Container } from '@mui/material'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import About from '../../components/About'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

function AboutPage(props) {
  const title = t`Customer Service`

  return (
    <>
      <PageMeta
        title='About | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/about'
      />

      <InnerTop title={'About'} isFilter={false} />

      <About />
    </>
  )
}

AboutPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default AboutPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
