import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import Courses from '../../components/courses'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
import { cmsPageDocument } from '../../graphql/CmsPage.gql'
import {
  GetSubCategoriesDocument,
  GetSubCategoriesQuery,
} from '../../graphql/CourseSubCategories.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
type CoursePropsType = {
  courseCategoryData?: GetSubCategoriesQuery
  cmsBlocks?: any
}

function CoursesPage(props: CoursePropsType) {
  const { courseCategoryData, cmsBlocks } = props
  const coursesTop = cmsBlocks.find((block) => block.identifier === 'courses-top')
  const decodedCoursesTop = decodeHtmlEntities(coursesTop?.content)
  return (
    <>
      <PageMeta
        title='Courses | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/courses'
      />

      <InnerTop title={'courses'} isFilter={false} />

      <Courses coursesCategory={courseCategoryData} coursesTop={decodedCoursesTop} />
    </>
  )
}

CoursesPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CoursesPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  {
    /*  const cmspage = staticClient.query({
    query: cmsPageDocument,
    variables: {
      urlKey: 'courses',
    },
    fetchPolicy: cacheFirst(staticClient),
  })*/
  }

  const cmsBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: ['courses-top'],
    },
  })

  const courseCategoryQueries = staticClient.query({
    query: GetSubCategoriesDocument,
    variables: {
      parentId: '2',
    },
  })

  const courseCategoryData = (await courseCategoryQueries)?.data?.mpBlogCategories?.items
  const cmsBlocks = (await cmsBlocksQuery)?.data?.cmsBlocks?.items
  return {
    props: {
      ...(await layout).data,
      courseCategoryData,
      cmsBlocks,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
