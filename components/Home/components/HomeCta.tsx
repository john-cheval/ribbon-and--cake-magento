import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import bannerImage from '../../Assets/cta.jpg'
import svgImage from '../../Assets/logo.png'
import { OrderPrimaryButton } from '../../shared/Button/order/Primary'

// import { HomeCtaFragment } from './HomeCTA.gql'

export function HomeCta(props) {
  const { title } = props

  const data = Array.from({ length: 15 }, (_, i) => i + 1)
  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        component='div'
        sx={{
          paddingInline: '55px',
          paddingTop: '77px',
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${bannerImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            position: 'relative',
            width: '100%',
          }}
        >
          <Box
            component='div'
            sx={{
              position: 'relative',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              rowGap: '12px',
            }}
          >
            <Typography
              component='h2'
              variant='h2'
              sx={{
                color: '#fff !important',
                maxWidth: '585px',
                textAlign: 'center',
              }}
            >
              {title || 'A sweet start - Enjoy 20% off your first order.'}
            </Typography>

            <OrderPrimaryButton href='/order' text='Order Now' />
          </Box>
          <Box
            component='div'
            sx={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.55)',
              borderRadius: '8px',
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '80px',
          right: 0,
          backgroundColor: '#F6DBE0',
          borderBlock: '1px solid #9B7C38',
          display: 'flex',
          columnGap: '50px',
          padding: '10px 0',
          alignItems: 'center',
          transform: 'rotate(-2.939deg)',
          width: '100%',
        }}
      >
        {data?.map((img, index) => (
          <Image
            key={img || index}
            src={svgImage}
            alt='customize Image'
            width={218}
            height={18}
            sizes='100vw'
            sx={{
              // maxWidth: '456px',
              objectFit: 'cover',
              flexShrink: 0,
              width: '200px',
              // borderRadius: '8px',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
