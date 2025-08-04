import { Image } from '@graphcommerce/image'
import { Box, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { eventsData, eventsList } from '../../../constants/Home/swiper'
import events1 from '../../Assets/events/image-1.jpg'
import events2 from '../../Assets/events/image-2.jpg'
import EventsAndCoursesTileResponsive from '../../shared/components/CoursetileResponsive'
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
        {eventsData?.map((item, index) => (
          <EventsAndCoursesTileResponsive
            key={item?.id || index}
            title={item?.title}
            id={index}
            isSelected={selectedCategory === item?.title}
            length={eventsData?.length}
            onClick={() => {
              setSelectedCategory((prev) => (prev === item?.title ? null : item?.title))
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

        <Typography
          component='p'
          variant='p'
          sx={{
            color: (theme: any) => theme.palette.custom.secondary,
            lineHeight: '174%',
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            marginTop: { xs: '10px', md: '10px', lg: '18px' },
          }}
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
          cupcakes, and desserts with your brand or image. Just complete the form bel ow to get
          started, no event is too big or small!
        </Typography>

        <Box sx={{ marginBlock: { xs: '14px', sm: '20px', md: '25px', lg: '34px' } }}>
          <Typography
            sx={{
              color: (theme: any) => theme.palette.custom.dark,
              fontSize: { xs: '16px', md: '20px' },
              lineHeight: '120%',
              marginBottom: { xs: '10px', md: '15px', lg: '20px' },
            }}
          >
            Lorem Ipsum
          </Typography>

          {eventsList?.map((list, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'start', columnGap: { xs: '5px', lg: '10px' } }}
            >
              <span
                style={{
                  height: '5px',
                  width: '5px',
                  backgroundColor: '#F1A8B6',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginTop: '12px',
                }}
              ></span>
              <Typography
                variant='p'
                component='p'
                sx={{
                  color: (theme: any) => theme.palette.custom.secondary,
                  lineHeight: '242%',
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                }}
              >
                {list}
              </Typography>
            </Box>
          ))}
        </Box>

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
