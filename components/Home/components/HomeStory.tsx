import { Box } from '@mui/material'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'
import HomeProductListMobile from './HomeProductListMobile'

export function HomeStory(props) {
  const { cakesCategories, title } = props
  return (
    <Box
      sx={{
        paddingInline: { xs: '18px', md: '25px', lg: '55px' },
        paddingTop: { xs: '30px', md: '45px', lg: '60px' },
      }}
      component='section'
    >
      {title && <div dangerouslySetInnerHTML={{ __html: title }} />}

      <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProductSwiper
          data={cakesCategories?.children}
          link='/cakes'
          initial={cakesCategories?.children[0]?.name}
        />
      </Box>

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile
          data={cakesCategories?.children}
          link='/cakes'
          initial={cakesCategories?.children[0]?.name}
          count={4}
        />
      </Box>
    </Box>
  )
}
