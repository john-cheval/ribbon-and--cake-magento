import { Image, StaticImport } from '@graphcommerce/image'
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { saxoGrammaticus } from '../../../lib/fonts'

export type CardProps = {
  courseCardData: {
    id: number
    title: string
    image: string | StaticImport
    description: string
  }
}

function CourseCard(props: CardProps) {
  const { courseCardData } = props
  return (
    <Card sx={{ position: 'relative', border: '1px solid #E6E6E6', borderRadius: '8px' }}>
      <CardMedia sx={{ position: 'relative', padding: '8px 8px 0px' }}>
        <Image
          src={courseCardData?.image}
          alt={courseCardData?.title}
          width={200}
          height={190}
          sx={{ height: 'auto', width: '100%', objectFit: 'cover' }}
        />

        <Box
          sx={{
            display: 'flex',
            columnGap: '5px',
            position: 'absolute',
            top: { xs: '15px', md: '20px' },
            right: { xs: '15px', md: '20px' },
          }}
        >
          <Box
            sx={{
              padding: { xs: '3px 12px', md: '5px 15px' },
              background: (theme) => theme.palette.primary.contrastText,
              borderRadius: '999px',
              border: '1px solid #F6DBE0',
              backdropFilter: 'blur(4.699999809265137px)',
              color: 'primary.main',
              fontSize: { xs: '12px', sm: '14px' },
            }}
          >
            Course 1
          </Box>
          <Box
            sx={{
              padding: { xs: '3px 12px', md: '5px 15px' },
              background: (theme) => theme.palette.primary.contrastText,
              borderRadius: '999px',
              border: '1px solid #F6DBE0',
              backdropFilter: 'blur(4.699999809265137px)',
              color: 'primary.main',
              fontSize: { xs: '12px', sm: '14px' },
            }}
          >
            2 Days
          </Box>
        </Box>
      </CardMedia>
      <CardContent sx={{ padding: { xs: '2px 17px 17px', md: '10px 17px 17px' } }}>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{
            color: (theme: any) => theme.palette.custom.heading,
            fontSize: { xs: '20px', md: '24px' },
            fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
            textTransform: 'uppercase',
            fontWeight: '300 !important',
            marginBottom: { xs: 0 },
          }}
        >
          {courseCardData?.title}
        </Typography>
        <Typography
          sx={{
            color: (theme: any) => theme.palette.custom.secondary,
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            lineHeight: '174%',
          }}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Typography>
        <Link
          href={`/courses/baking-classes/create-designs-with-buttercream-icing`}
          passHref
          legacyBehavior
        >
          <CardActions
            sx={{
              backgroundColor: (theme: any) => theme.palette.custom.heading,
              padding: { xs: '14px', md: '17px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: '3px',
              color: (theme: any) => theme.palette.primary.contrastText,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              borderRadius: '4px',
              marginTop: '12px',
              cursor: 'pointer',
              textDecoration: 'none',
              '& svg': {
                transition: 'transform 0.3s ease-in-out',
              },
              '&:hover svg': {
                transform: 'translateX(8px)',
              },
            }}
          >
            View Course <IoIosArrowRoundForward />
          </CardActions>
        </Link>
      </CardContent>
    </Card>
  )
}

export default CourseCard
