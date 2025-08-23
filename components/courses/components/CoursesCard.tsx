import { Image, StaticImport } from '@graphcommerce/image'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { saxoGrammaticus } from '../../../lib/fonts'
import { truncateByChars } from '../../../utils/truncate'

function CourseCard(props) {
  const { courseCardData } = props

  const isMobile = useMediaQuery('(max-width:1024px)')
  const charactersLegthTitle = isMobile ? 30 : 50
  const descriptionCharactersLength = isMobile ? 100 : 200
  return (
    <Card
      sx={{
        position: 'relative',
        border: '1px solid #E6E6E6',
        borderRadius: '8px',
      }}
    >
      <CardMedia sx={{ position: 'relative', padding: '8px 8px 0px' }}>
        <Image
          src={
            courseCardData?.image ||
            'https://srv900162.hstgr.cloud/media/mageplaza/blog/post/r/e/rectangle_221.jpg'
          }
          alt={courseCardData?.name}
          width={200}
          height={190}
          sx={{ height: 'auto', width: '100%', objectFit: 'cover' }}
        />

        {courseCardData?.tags?.items.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              columnGap: '5px',
              position: 'absolute',
              top: { xs: '15px', md: '20px' },
              right: { xs: '15px', md: '20px' },
            }}
          >
            {courseCardData?.tags?.items?.map((tag, index) => (
              <Box
                key={tag?.name || index}
                sx={{
                  padding: { xs: '3px 12px', md: '5px 15px' },
                  background: (theme) => theme.palette.primary.contrastText,
                  borderRadius: '999px',
                  border: '1px solid #F6DBE0',
                  backdropFilter: 'blur(4.699999809265137px)',
                  color: 'primary.main',
                  fontSize: { xs: '15px' },
                }}
              >
                {tag?.name}
              </Box>
            ))}
          </Box>
        )}
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
            minHeight: { xs: 'auto', sm: '60px', md: '75px' },
          }}
        >
          {truncateByChars(courseCardData?.name, charactersLegthTitle)}
        </Typography>
        {courseCardData?.short_description && (
          <Typography
            sx={{
              color: (theme: any) => theme.palette.custom.secondary,
              fontSize: { xs: '15px', md: '16px' },
              lineHeight: '174%',
            }}
          >
            {truncateByChars(courseCardData?.short_description, descriptionCharactersLength)}
          </Typography>
        )}

        <Link href={`/courses/baking-classes/${courseCardData?.url_key}`} passHref legacyBehavior>
          <CardActions
            sx={{
              backgroundColor: (theme: any) => theme.palette.custom.heading,
              padding: { xs: '14px', md: '17px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: '3px',
              color: (theme: any) => theme.palette.primary.contrastText,
              fontSize: { xs: '15px', md: '16px' },
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
