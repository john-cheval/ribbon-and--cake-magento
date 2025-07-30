import { Image } from '@graphcommerce/image'
import { Box, Grid, Typography } from '@mui/material'
import { celebrations } from '../../../constants/Home/swiper'
// import { HomeSectionFourFragment } from './HomeSectionFour.gql'
import leftImage from '../../Assets/left.jpg'
import { HoveredButton } from '../../shared/Button/HoveredButon'
import { ProductCard } from '../../shared/Cards/ProductCard'
import HomeProductListMobile from './HomeProductListMobile'

export function HomeSectionFour(props) {
  const { title } = props
  return (
    <Box
      component='section'
      sx={{
        paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        paddingTop: { xs: '27px', sm: '35px', md: '50px', lg: '75px', xl: '100px' },
        display: 'grid',
        columnGap: { xs: '0', md: '20px', lg: '25px', xl: '35px' },
        position: 'relative',
      }}
    >
      <Grid container columnSpacing={{ xs: '0', md: '15px', lg: '20px', xl: '35px' }}>
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          xl={5}
          sx={{
            position: { xs: 'unset', lg: 'sticky' },
            top: { xs: 'unset', lg: '50px' },
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
                height: '100%',
              }}
            />

            <Box
              component='div'
              sx={{
                position: 'absolute',
                width: { xs: '100%', lg: '50%' },
                top: { xs: '30px', md: '40px', lg: '63px' },
                left: { xs: 'unset', lg: '69px' },
                paddingInline: { xs: '20px', lg: '0px' },
              }}
            >
              <Typography
                component='h2'
                variant='h2'
                sx={{
                  color: (theme: any) => theme.palette.custom.main,
                  textAlign: { xs: 'center', lg: 'left' },
                  marginBottom: { xs: '3px', md: '5px', lg: '8px' },
                }}
              >
                {title || 'Statement cakes for standout celebrations.'}
              </Typography>

              <Typography
                component='p'
                variant='p'
                sx={{
                  color: (theme: any) => theme.palette.custom.main,
                  lineHeight: '170% !important',
                  fontWeight: '400',
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  marginBottom: { xs: '12px', md: '15px', xl: '25px' },
                  maxWidth: { xs: '100%', lg: '500px', xl: '350px' },
                  textAlign: { xs: 'center', lg: 'left' },
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
                isCenter={true}
              />
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          md={12}
          lg={6}
          xl={7}
          sx={{
            overflowY: 'auto',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Grid container columnSpacing={{ xs: 0, sm: '15px', lg: '20px', xl: '30px' }}>
            <Grid item xs={12} sm={6}>
              <Grid container rowSpacing={{ xs: '20px', lg: '25px', xl: '37px' }}>
                {celebrations?.slice(0, 4)?.map((data, index) => (
                  <Grid item xs={12} key={data?.id || index}>
                    <ProductCard item={data} iconPosition='left' padding='14px' left='25px' />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ marginTop: { lg: '50px', xl: '60px' } }}>
              <Grid container rowSpacing={{ xs: '20px', lg: '25px', xl: '37px' }}>
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

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile
          data={celebrations}
          link='/cakes'
          initial='Custom Cake'
          count={6}
          isCategory={false}
        />
      </Box>
    </Box>
  )
}
