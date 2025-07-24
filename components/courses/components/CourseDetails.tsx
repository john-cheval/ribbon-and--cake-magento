import { Box, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { coursesData } from '../../../constants/courses/coursesData'
import EventsAndCoursesTile from '../../shared/components/EventsAndCoursesTile'
import Loading from '../../shared/Loading'
import CourseCard from './CoursesCard'

function CourseDetail() {
  const [visibleCount, setVisibleCount] = useState(8)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(coursesData[0]?.category)
  const uniqueCategories = Array.from(new Set(coursesData?.map((course) => course.category)))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setLoading(true)

          setTimeout(() => {
            setVisibleCount((prev) => {
              const newCount = prev + 4

              // 🛑 Stop loading if all courses are shown
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
    ? coursesData.filter((course) => course.category === selectedCategory)
    : coursesData
  return (
    <Box
      component='section'
      sx={{
        paddingInline: {
          xs: '18px',
          md: '25px',
          lg: '55px',
        },
        // paddingTop: '18px',
        marginBottom: '30px',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        gridTemplateRows: { xs: 'auto', md: 'auto' },
        gap: { xs: '20px', md: '20px', xl: '40px' },
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: 'auto', md: 'span 4' },
          paddingTop: { md: '35px', lg: '50px' },
          position: { xs: 'static', md: 'sticky' },
          top: { xs: 'auto', md: '100px' },
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
          {uniqueCategories?.map((course, index) => (
            <EventsAndCoursesTile
              key={course || index}
              title={course}
              id={index}
              isSelected={selectedCategory === course}
              length={uniqueCategories?.length}
              onClick={() => {
                setSelectedCategory((prev) => (prev === course ? null : course))
                setVisibleCount(8)
              }}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          gridColumn: { xs: 'auto', md: 'span 8' },
          paddingTop: { md: '20px', lg: '18px' },
        }}
      >
        <Typography
          sx={{
            color: (theme: any) => theme.palette.custom.tertiary,
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            marginBottom: { xs: '14px', md: '17px' },
          }}
        >
          Workshops & Courses
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(3, 1fr)',
              // xl: 'repeat(4, 1fr)',
            },
            columnGap: { xs: '0', md: '10px', lg: '17px', xl: '20px' },
            rowGap: { xs: '10px', md: '8px', lg: '15px' },
          }}
        >
          {filteredCourses?.slice(0, visibleCount)?.map((course, index) => (
            <CourseCard key={index} courseCardData={course} />
          ))}
        </Box>

        {/* Loading Indicator */}
        {loading && hasMore && <Loading />}

        {/* Observer div */}
        <div ref={observerRef} style={{ height: '1px', marginTop: '1px' }} />
      </Box>
    </Box>
  )
}

export default CourseDetail
