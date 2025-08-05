import { Image } from '@graphcommerce/image'
import { Box, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { eventsData } from '../../../constants/Home/swiper'
import events1 from '../../Assets/events/image-1.jpg'
import events2 from '../../Assets/events/image-2.jpg'
import EventsAndCoursesTileResponsive from '../../shared/components/CoursetileResponsive'
import EventsAndCoursesTile from '../../shared/components/EventsAndCoursesTile'
import EventsGallerySwiper from '../../shared/swiper/EventsGallerySwiper'
import EnquiryForm from './EnquiryForm'

function EventsDetails({ list }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(list[0]?.name)

  const filteredEvents = selectedCategory
    ? list.filter((event) => event?.name === selectedCategory)
    : list

  return (
    <Box
      component='section'
      sx={{
        paddingInline: {
          xs: '18px',
          md: '25px',
          xl: '55px',
        },
        paddingTop: { xs: '0px', md: '10px', lg: '40px', xl: '65px' },
        marginBottom: { xs: '30px', lg: '44px' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
        gridTemplateRows: { xs: 'auto', lg: 'auto' },
        gap: { xs: '0px', lg: '20px', xl: '40px' },
        rowGap: { xs: '10px', md: '20px' },
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: 'span 12', lg: 'span 4' },
          borderTop: '1px solid #E6E6E6',
          paddingBlock: { xs: '10px', md: '15px', xl: '22px' },
          position: { xs: 'static', lg: 'sticky' },
          top: { xs: 'auto', lg: '100px' },
          alignSelf: { xs: 'unset', lg: 'start' },
          display: { xs: 'none', lg: 'block' },
        }}
      >
        {list?.map((item, index) => (
          <EventsAndCoursesTile
            key={item?.post_id || index}
            isSelected={selectedCategory === item?.name}
            title={item?.name}
            id={index}
            length={list?.length}
            onClick={() => {
              setSelectedCategory((prev) => (prev === item?.name ? null : item?.name))
            }}
          />
        ))}
      </Box>

      <Box
        component='div'
        sx={{
          display: { xs: 'flex', lg: 'none' },
          columnGap: { xs: '6px', sm: '8px' },
          marginTop: { xs: '14px' },
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          // width: '330px',
          paddingBottom: '4px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },

          scrollbarWidth: 'none',

          '-ms-overflow-style': 'none',
          width: '100%',
        }}
      >
        {list?.map((item, index) => (
          <EventsAndCoursesTileResponsive
            key={item?.post_id || index}
            title={item?.name}
            id={index}
            isSelected={selectedCategory === item?.name}
            length={list?.length}
            onClick={() => {
              setSelectedCategory((prev) => (prev === item?.name ? null : item?.name))
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          gridColumn: { xs: 'span 12', lg: 'span 8' },
        }}
      >
        <EventsGallerySwiper imageGallery={eventsData[0]?.images} />

        <div
          className='events-detail'
          dangerouslySetInnerHTML={{ __html: filteredEvents?.[0]?.post_content }}
        />

        <Box
          sx={{
            display: 'flex',
            columnGap: { xs: 0, md: '15px', lg: '20px' },
            rowGap: { xs: '10px', md: 0 },
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Image
            src={events1}
            alt='events1'
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />

          <Image
            src={events2}
            alt='events2'
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Divider
          sx={{
            backgroundColor: '#E6E6E6',
            marginTop: { xs: '20px', md: '25px', lg: '30px', xl: '40px' },
          }}
        />

        <EnquiryForm />
      </Box>
    </Box>
  )
}

export default EventsDetails
