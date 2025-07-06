import { Image } from '@graphcommerce/image'
import { Box, Grid, Typography } from '@mui/material'
import { celebrations } from '../../../constants/Home/swiper'
// import { HomeSectionFourFragment } from './HomeSectionFour.gql'
import leftImage from '../../Assets/left.jpg'
import { HoveredButton } from '../../shared/Button/HoveredButon'
import { ProductCard } from '../../shared/Cards/ProductCard'

export function HomeSectionFour(props) {
  const { title } = props
  return (
    <Box
      sx={{
        paddingInline: '55px',
        paddingTop: '100px',
        display: 'grid',
        columnGap: '35px',
        position: 'relative',
      }}
    >
      <Grid container columnSpacing={{ xs: 0, md: '35px' }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            position: 'sticky',
            top: '50px',
            alignSelf: 'start',
          }}
        >
          <Box
            component='div'
            sx={{
              position: 'relative',
            }}
          >
            <Image
              src={leftImage}
              alt={title || 'Statement cakes for standout celebrations.'}
              width={597}
              height={701}
              sizes='100vw'
              sx={{
                // maxWidth: '456px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />

            <Box
              component='div'
              sx={{
                position: 'absolute',
                width: '50%',
                top: '63px',
                left: '69px',
              }}
            >
              <Typography
                component='h2'
                variant='h2'
                sx={{
                  color: '#441E14 !important',
                  marginBottom: '8px',
                }}
              >
                {title || 'Statement cakes for standout celebrations.'}
              </Typography>

              <Typography
                component='p'
                variant='p'
                sx={{
                  color: '#441E14 !important',
                  lineHeight: '170% !important',
                  fontWeight: '400',
                  marginBottom: '25px',
                  maxWidth: '344px',
                }}
              >
                Our cakes are not just desserts they are edible masterpieces. We specialize in
                creating highly detailed
              </Typography>

              <HoveredButton
                text='Explore our collection'
                href='/explore '
                isArrow={false}
                width='fit-content'
              />
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          sx={{
            overflowY: 'auto',
          }}
        >
          <Grid container columnSpacing={{ xs: 0, md: '33px' }}>
            <Grid item xs={12} md={6}>
              <Grid container rowSpacing={{ xs: '20px', md: '37px' }}>
                {celebrations?.slice(0, 4)?.map((data, index) => (
                  <Grid item xs={12} key={data?.id || index}>
                    <ProductCard item={data} iconPosition='left' padding='14px' left='25px' />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} sx={{ marginTop: '80px' }}>
              <Grid container rowSpacing={{ xs: '20px', md: '37px' }}>
                {celebrations?.slice(4)?.map((data, index) => (
                  <Grid item xs={12} key={data?.id || index}>
                    <ProductCard item={data} iconPosition='left' padding='14px' left='25px' />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
