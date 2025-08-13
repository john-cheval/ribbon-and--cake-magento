import { Box } from '@mui/material'
import { HeroSwiper } from '../../shared/swiper/HeroSwiper'

export function HomeBanner({ content, productList, title }) {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: { xs: '600px', lg: '90vh' },
          '& [data-content-type="html"]': {
            height: '100%',
          },
        }}
      >
        {content && (
          <div style={{ height: '100%' }} dangerouslySetInnerHTML={{ __html: content }} />
        )}

        <Box
          sx={{
            position: 'absolute',
            bottom: '50px',
            left: { xs: '18px', md: '25px', lg: '55px' },
            right: 0,
          }}
        >
          {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
          <HeroSwiper products={productList} />
        </Box>
      </Box>
      <Box
        sx={{
          backdropFilter: 'blur(0px)',
          background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
          width: '100%',
          height: '100%',
          maxHeight: '73px',
          position: 'absolute',
          top: { xs: '64px', md: '79px', lg: '89px' },
          left: 0,
        }}
      />
    </>
  )
}
