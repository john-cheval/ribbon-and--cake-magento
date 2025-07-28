import { Image } from '@graphcommerce/image'
import { Box, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { eventsData, eventsList } from '../../../constants/Home/swiper'
import events1 from '../../Assets/events/image-1.jpg'
import events2 from '../../Assets/events/image-2.jpg'
import EventsAndCoursesTile from '../../shared/components/EventsAndCoursesTile'
import EventsGallerySwiper from '../../shared/swiper/EventsGallerySwiper'
import EnquiryForm from './EnquiryForm'

function EventsDetails() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(eventsData[0]?.title)

  const filteredEvents = selectedCategory
    ? eventsData.filter((event) => event.title === selectedCategory)
    : eventsData

  return (
    <Box
      component='section'
      sx={{
        paddingInline: {
          xs: '18px',
          md: '25px',
          lg: '55px',
        },
        paddingTop: '65px',
        marginBottom: '44px',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        gridTemplateRows: { xs: 'auto', md: 'auto' },
        gap: { xs: '20px', md: '40px' },
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: 'auto', md: 'span 4' },
          borderTop: '1px solid #E6E6E6',
          paddingBlock: '22px',
          position: { xs: 'static', md: 'sticky' },
          top: { xs: 'auto', md: '100px' },
          alignSelf: { xs: 'unset', md: 'start' },
        }}
      >
        {eventsData?.map((item, index) => (
          <EventsAndCoursesTile
            key={item?.id || index}
            isSelected={selectedCategory === item?.title}
            title={item?.title}
            id={index}
            length={eventsData?.length}
            onClick={() => {
              setSelectedCategory((prev) => (prev === item?.title ? null : item?.title))
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          gridColumn: { xs: 'auto', md: 'span 8' },
        }}
      >
        <EventsGallerySwiper imageGallery={eventsData[0]?.images} />

        <Typography
          component='p'
          variant='p'
          sx={{ color: '#6f6f6f', lineHeight: '174%', marginTop: '18px' }}
        >
          Elevate your next event with Ribbons & Balloons. Our expert team specializes in
          personalizing cakes, cupcakes, and desserts with your brand or image. Just complete the
          form below to get started, no event is too big or small!Elevate your next event with
          Ribbons & Balloons. Our expert team specializes in personalizing cakes, cupcakes, and
          desserts with your brand or image. Just complete the form below to get started, no event
          is too big or small!Elevate your next event with Ribbons & Balloons. Our expert team
          specializes in personalizing cakes, cupcakes, and desserts with your brand or image. Just
          complete the form below to get started, no event is too big or small!Elevate your next
          event with Ribbons & Balloons. Our expert team specializes in personalizing cakes,
          cupcakes, and desserts with your brand or image. Just complete the form below to get
          started, no event is too big or small!
        </Typography>

        <Box sx={{ marginBlock: '34px' }}>
          <Typography
            sx={{
              color: '#ooo',
              fontSize: '20px !important',
              lineHeight: '120%',
              marginBottom: '30px',
            }}
          >
            Lorem Ipsum
          </Typography>

          {eventsList?.map((list, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
              <span
                style={{
                  height: '9px',
                  width: '9px',
                  backgroundColor: '#F1A8B6',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              ></span>
              <Typography variant='p' component='p' sx={{ color: '#6F6F6F', lineHeight: '242%' }}>
                {list}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', columnGap: '20px' }}>
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

        <Divider sx={{ backgroundColor: '#E6E6E6', marginTop: '40px' }} />

        <EnquiryForm />
      </Box>
    </Box>
  )
}

export default EventsDetails
