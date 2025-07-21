import { Image } from '@graphcommerce/image'
import { Box, Divider, Typography } from '@mui/material'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { eventsData, eventsList } from '../../../constants/Home/swiper'
import { saxoGrammaticus } from '../../../lib/fonts'
import events1 from '../../Assets/events/image-1.jpg'
import events2 from '../../Assets/events/image-2.jpg'
import EventsGallerySwiper from '../../shared/swiper/EventsGallerySwiper'
import EnquiryForm from './EnquiryForm'

function EventsDetails() {
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
        }}
      >
        {eventsData?.map((item, index) => (
          <Typography
            component='p'
            key={item?.id || index}
            sx={{
              fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
              color: '#9B7C38',
              fontSize: '35px !important',
              textTransform: 'uppercase',
              fontWeight: '300 !important',
              borderBottom: eventsData.length - 1 ? '1px solid #E6E6E6' : '',
              paddingBottom: '20px',
              paddingTop: index === 0 ? '' : '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.4s ease',
              cursor: 'pointer',

              '&:hover': {
                color: '#441E14',
              },

              '&:hover .arrow-icon': {
                transform: 'translateX(8px)',
                opacity: 1,
              },
            }}
          >
            {item?.title}

            <Box
              className='arrow-icon'
              sx={{
                transition: 'transform 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                opacity: 0,
              }}
            >
              <IoIosArrowRoundForward color='#441E14' />
            </Box>
          </Typography>
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
