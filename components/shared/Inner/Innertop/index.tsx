import { Image } from '@graphcommerce/image'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import rightArrow from './arrow_right.svg'

function capitalizeFirstLetter(str?: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function InnerTop() {
  const router = useRouter()
  const routes = Array.isArray(router.query.url) ? router.query.url[0] : undefined
  const capitalizedRoute = capitalizeFirstLetter(routes)

  return (
    <Box sx={{ paddingInline: '55px' }}>
      <Box sx={{ borderBlock: '1px solid #d4d4d4', paddingBlock: '15px' }}>
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{
            display: 'flex',
            columnGap: '10px',
            alignItems: 'center',
          }}
        >
          <Link
            style={{
              color: '#969696',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: '16px ',
              fontWeight: 400,
            }}
            href='/'
          >
            Home
          </Link>

          <Image
            src={rightArrow}
            width={18}
            height={18}
            sizes='100vw'
            sx={{
              width: '18px',
            }}
          />

          <Typography
            component='p'
            variant='p'
            sx={{
              color: '#969696 !important',
              fontWeight: 400,
            }}
          >
            {capitalizedRoute}
          </Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  )
}
