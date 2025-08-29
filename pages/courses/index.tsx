import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import Courses from '../../components/courses'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { MpBlogPostsDocument, MpBlogPostsQuery } from '../../graphql/BlogsByCatergoryId.gql'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
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
  coursesList?: MpBlogPostsQuery
}

function CoursesPage(props: CoursePropsType) {
  const { courseCategoryData, cmsBlocks, coursesList } = props
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

      <InnerTop title={'Baking Classes'} isFilter={false} />

      <Courses
        coursesCategory={courseCategoryData}
        coursesTop={decodedCoursesTop}
        allCourses={coursesList}
      />
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

  const CoursesQueries = staticClient.query({
    query: MpBlogPostsDocument,
    variables: {
      action: 'get_post_by_categoryId',
      categoryId: 2,
      pageSize: 50,
      currentPage: 1,
    },
  })

  const courseCategoryData = (await courseCategoryQueries)?.data?.mpBlogCategories?.items
  const cmsBlocks = (await cmsBlocksQuery)?.data?.cmsBlocks?.items
  const coursesList = (await CoursesQueries)?.data?.mpBlogPosts?.items
  return {
    props: {
      ...(await layout).data,
      courseCategoryData,
      cmsBlocks,
      coursesList,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
