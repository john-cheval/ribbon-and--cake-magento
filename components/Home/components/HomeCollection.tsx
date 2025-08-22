import { Image } from '@graphcommerce/image'
import { Box, Grid, Typography } from '@mui/material'
import bannerImage from '../../Assets/collection.jpg'
import { HoveredButton } from '../../shared/Button/HoveredButon'

export function HomeCollection(props) {
  const { title } = props
  return (
    <Box
      sx={{
        paddingInline: { xs: '18px', md: '25px', lg: '55px' },
        paddingTop: { xs: '27px', sm: '35px', md: '50px', lg: '75px' },
        position: 'relative',
        overflow: 'hidden',
      }}
      component='section'
    >
      <Grid
        container
        sx={{
          position: 'relative',
        }}
      >
        <Grid item xs={12} lg={7}>
          <Image
            src={bannerImage}
            alt={title || 'banner image'}
            width={797}
            height={565}
            sizes='100vw'
            sx={{
              borderRadius: '8px',
              zIndex: { xs: 100, lg: 99 },
              position: 'relative',
            }}
          />
        </Grid>

        <Grid container>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              borderRadius: '8px',
              background: 'rgba(243, 243, 243, 0.83)',
              backdropFilter: 'blur(5.300000190734863px)',
              padding: { xs: '50px 40px 40px', lg: '60px 50px ', xl: '100px 88px' },
              marginLeft: 'auto',
              position: { xs: 'unset', lg: 'absolute' },
              top: { xs: 'unset', lg: '50%' },
              right: { xs: 'unset', lg: '55px' },
              transform: { xs: 'unset', lg: 'translateY(-50%)' },
              width: '100%',
              zIndex: { xs: 99, lg: 101 },
              marginTop: { xs: '-30px', lg: 0 },
            }}
          >
            <Typography
              component='h2'
              variant='h2'
              sx={{ textAlign: { xs: 'center', lg: 'left' } }}
            >
              {title || 'Lorem Ipsum is simply'}
            </Typography>

            <Typography
              component='p'
              variant='p'
              sx={{
                fontWeight: 400,
                lineHeight: '174% !important',
                maxWidth: { xs: '100%', lg: '465px' },
                marginBottom: { xs: '20px', xl: '25px' },
                marginTop: { xl: '16px' },
                fontSize: { xs: '15px', md: '16px' },
                textAlign: { xs: 'center', lg: 'left' },
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy
            </Typography>

            <HoveredButton
              text='Explore our collection'
              href='/explore '
              isArrow={false}
              width='fit-content'
              isCenter={true}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
