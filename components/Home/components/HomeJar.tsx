import { Box } from '@mui/material'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'
import HomeProductListMobile from './HomeProductListMobile'

export function HomeJar(props) {
  const { jarsAndMniBytesCategories, title } = props

  return (
    <Box
      sx={{
        paddingInline: { xs: '18px', md: '25px', lg: '55px' },
        paddingTop: { xs: '30px', md: '45px', lg: '60px', xl: '80px' },
        paddingBottom: { xs: '30px', sm: '35px', md: '40px', lg: '55px' },
      }}
      component='section'
    >
      {title && <div dangerouslySetInnerHTML={{ __html: title }} />}

      <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProductSwiper
          data={jarsAndMniBytesCategories?.children}
          link='/shop'
          initial={jarsAndMniBytesCategories?.children[0]?.name}
        />
      </Box>

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile
          data={jarsAndMniBytesCategories?.children}
          link='/shop'
          initial={jarsAndMniBytesCategories?.children[0]?.name}
          count={4}
        />
      </Box>
    </Box>
  )
}
