import { Image } from '@graphcommerce/image'
import { Box, Grid, Typography } from '@mui/material'
// import { HomeCollectionFragment } from './HomeCollection.gql'
import bannerImage from '../../Assets/collection.jpg'
import { HoveredButton } from '../../shared/Button/HoveredButon'

export function HomeCollection(props) {
  const { title } = props
  return (
    <Box
      sx={{ paddingInline: '55px', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}
      component='section'
    >
      <Grid
        container
        sx={{
          position: 'relative',
        }}
      >
        <Grid item md={7}>
          <Image
            src={bannerImage}
            alt={title || 'banner image'}
            width={797}
            height={565}
            sizes='100vw'
            sx={{
              borderRadius: '8px',
            }}
          />
        </Grid>

        <Grid container>
          <Grid
            item
            md={6}
            sx={{
              borderRadius: '8px',
              background: 'rgba(243, 243, 243, 0.83)',
              backdropFilter: 'blur(5.300000190734863px)',
              padding: '100px 88px',
              marginLeft: 'auto',
              position: 'absolute',
              top: '50%',
              right: '55px',
              transform: 'translateY(-50%)',
              width: '100%',
            }}
          >
            <Typography component='h2' variant='h2'>
              {title || 'Lorem Ipsum is simply'}
            </Typography>

            <Typography
              component='p'
              variant='p'
              style={{
                fontWeight: 400,
                lineHeight: '174% !important',
                maxWidth: '465px',
                marginBottom: '40px',
                marginTop: '16px',
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
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
