import { Box } from '@mui/material'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'
import HomeProductListMobile from './HomeProductListMobile'

export function HomeStory(props) {
  const { cakesCategories, products, title } = props
  return (
    <Box
      sx={{
        paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        paddingTop: { xs: '30px', md: '45px', lg: '60px' },
      }}
      component='section'
    >
      {/*  <Typography component='h2' variant='h2' sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        {'Start your sweet story'}
      </Typography>*/}

      {title && <div dangerouslySetInnerHTML={{ __html: title }} />}

      <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProductSwiper
          data={cakesCategories?.children}
          link='/cakes'
          initial={cakesCategories?.children[0]?.name}
          productList={products}
        />
      </Box>

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile
          data={cakesCategories?.children}
          link='/cakes'
          initial={cakesCategories?.children[0]?.name}
          count={4}
          productList={products}
        />
      </Box>
    </Box>
  )
}
