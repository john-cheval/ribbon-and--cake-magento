import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { RenderType } from '@graphcommerce/next-ui'
import { Box, Grid } from '@mui/material'
import { productListRenderer } from '../../ProductListItems'
import HomeProductListMobile from './HomeProductListMobile'

export function HomeSectionFour(props) {
  const { title, content, products } = props
  return (
    <Box
      component='section'
      sx={{
        paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        paddingTop: { xs: '27px', sm: '35px', md: '50px', lg: '75px' },
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
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
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
              <AddProductsToCartForm>
                <Grid container rowSpacing={{ xs: '20px', lg: '25px', xl: '37px' }}>
                  {products?.slice(0, 4)?.map((product, index) => (
                    <Grid item xs={12} key={product?.uid || index}>
                      <Box
                        sx={{
                          '& .ProductListItem-imageContainer ': {
                            borderRadius: 'none !important',
                            '& img': {
                              borderRadius: '8px',
                            },
                            '& .ProductListItem-topRight .MuiButtonBase-root': {
                              border: (theme) => `1px solid ${theme.palette.custom.wishlistColor}`,
                              transition: 'all 0.4s ease-in-out',
                              '&:hover': {
                                boxShadow: '1px 3px 1px 0px rgb(0 0 0/ 0.6)',
                              },
                            },
                          },
                          '& .ProductListItem-titleContainer .ProductListItem-title': {
                            color: (theme: any) => theme.palette.custom.dark,
                            minHeight: '50px',
                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            lineHeight: '158%',
                          },
                        }}
                      >
                        <RenderType renderer={productListRenderer} {...product} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </AddProductsToCartForm>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ marginTop: { lg: '50px', xl: '60px' } }}>
              <AddProductsToCartForm>
                <Grid container rowSpacing={{ xs: '20px', lg: '25px', xl: '37px' }}>
                  {products?.slice(4, 8)?.map((product, index) => (
                    <Grid item xs={12} key={product?.uid || index}>
                      <Box
                        sx={{
                          '& .ProductListItem-imageContainer ': {
                            borderRadius: 'none !important',
                            '& img': {
                              borderRadius: '8px',
                            },
                            '& .ProductListItem-topRight .MuiButtonBase-root': {
                              border: (theme) => `1px solid ${theme.palette.custom.wishlistColor}`,
                              transition: 'all 0.4s ease-in-out',
                              '&:hover': {
                                boxShadow: '1px 3px 1px 0px rgb(0 0 0/ 0.6)',
                              },
                            },
                          },
                          '& .ProductListItem-titleContainer .ProductListItem-title': {
                            color: (theme: any) => theme.palette.custom.dark,
                            minHeight: '50px',
                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            lineHeight: '158%',
                          },
                        }}
                      >
                        <RenderType renderer={productListRenderer} {...product} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </AddProductsToCartForm>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile
          data={products}
          link='/cakes'
          initial='Custom Cake'
          count={6}
          isCategory={false}
          productList={products}
        />
      </Box>
    </Box>
  )
}
