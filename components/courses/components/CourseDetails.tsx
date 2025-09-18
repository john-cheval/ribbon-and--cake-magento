import { Box, styled, Typography } from '@mui/material'
import { m } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cardVariants, containerVariants } from '../../../constants/animationVariation'
import { coursesData } from '../../../constants/courses/coursesData'
import EventsAndCoursesTileResponsive from '../../shared/components/CoursetileResponsive'
import EventsAndCoursesTile from '../../shared/components/EventsAndCoursesTile'
import Loading from '../../shared/Loading'
import CourseCard from './CoursesCard'

const MotionDiv = styled(m.div)({})

function CourseDetail({ categories, coursesList }) {
  const [visibleCount, setVisibleCount] = useState(8)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0]?.name)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRef = useRef<HTMLDivElement | null>(null)
  const isInitialRender = useRef(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setLoading(true)

          setTimeout(() => {
            setVisibleCount((prev) => {
              const newCount = prev + 4

              if (newCount >= coursesData.length) {
                setHasMore(false)
              }

              return newCount
            })
            setLoading(false)
          }, 500)
        }
      },
      { rootMargin: '100px' },
    )

    const currentObserver = observerRef.current
    if (currentObserver) observer.observe(currentObserver)

    return () => {
      if (currentObserver) observer.unobserve(currentObserver)
    }
  }, [loading, hasMore])

  const filteredCourses = selectedCategory
    ? coursesList.filter((course) =>
      course.categories?.items?.some((cat) => cat?.name === selectedCategory),
    )
    : coursesList

  useEffect(() => {
    const index = categories.findIndex((item) => item?.name === selectedCategory)
    if (index !== -1 && itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [selectedCategory, categories])

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [selectedCategory])

  return (
    <Box
      component='section'
      sx={{
        paddingInline: {
          xs: '18px',
          md: '25px',
          lg: '55px',
        },
        marginBottom: '30px',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        gridTemplateRows: { xs: 'auto', md: 'auto' },
        gap: { xs: '0px', md: '20px', xl: '40px' },
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: 'auto', md: 'span 4' },
          paddingTop: { xs: '20px', md: '35px', lg: '50px' },
          position: { xs: 'static', md: 'sticky' },
          top: { xs: 'auto', md: '80px', lg: '100px' },
          alignSelf: { xs: 'unset', md: 'start' },
        }}
      >
        <Typography
          sx={{
            color: (theme: any) => theme.palette.custom.dark,
            fontSize: { xs: '16px', md: '20px' },
            lineHeight: '120%',
          }}
        >
          Workshops & Courses
        </Typography>

        <Box
          sx={{
            borderTop: '1px solid #E6E6E6',
            marginTop: { xs: '14px', md: '28px' },
            display: { xs: 'none', md: 'block' },
          }}
        >
          {categories?.map((course, index) => (
            <EventsAndCoursesTile
              key={course?.category_id || index}
              title={course?.name}
              id={index}
              isSelected={selectedCategory === course?.name}
              length={categories?.length}
              onClick={() => {
                const name = course?.name
                // setSelectedCategory((prev) => (prev === name ? null : name))
                setSelectedCategory(name)
                setVisibleCount(8)
              }}
            />
          ))}
        </Box>
      </Box>
      <Box
        component='div'
        sx={{
          display: { xs: 'flex', md: 'none' },
          columnGap: { xs: '6px', sm: '8px' },
          marginTop: { xs: '14px' },
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingBottom: '4px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        }}
      >
        {categories?.map((course, index) => (
          <div
            key={course?.post_id || index}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
          >
            <EventsAndCoursesTileResponsive
              key={course?.category_id || index}
              title={course?.name}
              id={index}
              isSelected={selectedCategory === course?.name}
              length={categories?.length}
              onClick={() => {
                const name = course?.name
                // setSelectedCategory((prev) => (prev === name ? null : name))
                setSelectedCategory(name)

                setVisibleCount(4)
              }}
            />
          </div>
        ))}
      </Box>

      {/* Card Goes Here */}
      <Box
        ref={contentRef}
        sx={{
          gridColumn: { xs: 'auto', md: 'span 8' },
          paddingTop: { xs: '20px', lg: '18px' },
          scrollMarginTop: { xs: '150px', lg: '100px' },
        }}
      >
        <Typography
          sx={{
            color: (theme: any) => theme.palette.custom.tertiary,
            fontSize: { xs: '15px', md: '16px' },
            marginBottom: { xs: '14px', md: '17px' },
          }}
        >
          {filteredCourses?.length} Workshops & Courses
        </Typography>

        <MotionDiv
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            columnGap: { xs: '0', sm: '10px', lg: '17px', xl: '20px' },
            rowGap: { xs: '10px', md: '8px', lg: '15px' },
          }}
        >
          {filteredCourses?.length === 0 ? (
            <Typography
              sx={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                color: (theme) => theme.palette.custom.dark,
                fontSize: { xs: '16px', md: '20px' },
              }}
            >
              No courses found for this category.
            </Typography>
          ) : (
            filteredCourses.map((course, index) => (
              <MotionDiv key={index} variants={cardVariants}>
                <CourseCard courseCardData={course} />
              </MotionDiv>
            ))
          )}
        </MotionDiv>

        {/* Loading Indicator */}
        {loading && hasMore && <Loading />}

        {/* Observer div */}
        <div ref={observerRef} style={{ height: '1px', marginTop: '1px' }} />
      </Box>
    </Box>
  )
}

export default CourseDetail
