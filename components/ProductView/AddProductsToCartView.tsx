import { start } from 'repl'
import { useCartEnabled } from '@graphcommerce/magento-cart'
import {
  AddProductsToCartError,
  AddProductsToCartQuantity,
  AddToCartItemSelector,
  ProductCustomizable,
  ProductListPrice,
  ProductPageAddToCartQuantityRow,
  ProductPagePrice,
  ProductPagePriceTiers,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import {
  ConfigurableProductOptions,
  useConfigurableOptionsSelection,
} from '@graphcommerce/magento-product-configurable'
import { DownloadableProductOptions } from '@graphcommerce/magento-product-downloadable'
import { GroupedProducts } from '@graphcommerce/magento-product-grouped'
import { isTypename } from '@graphcommerce/next-ui'
import { Box, Divider, Typography } from '@mui/material'
import type { ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { fontSize } from '../theme'

export type AddProductsToCartViewProps = AddToCartItemSelector & {
  product: NonNullable<NonNullable<NonNullable<ProductPage2Query['products']>['items']>[number]>
}

export function AddProductsToCartView(props: AddProductsToCartViewProps) {
  const { product, index = 0 } = props
  const cartEnabled = useCartEnabled()
  const { configured } = useConfigurableOptionsSelection({ url_key: product?.url_key, index })

  const productConfiguredPrice =
    configured && 'configurable_product_options_selection' in configured
      ? (configured as { configurable_product_options_selection?: { variant?: any } })
          .configurable_product_options_selection?.variant
      : undefined

  const prodocutPrice = productConfiguredPrice ? productConfiguredPrice : product
  return (
    <>
      {isTypename(product, ['ConfigurableProduct']) && (
        <ConfigurableProductOptions product={product} />
      )}
      {isTypename(product, ['BundleProduct']) && (
        <BundleProductOptions product={product} layout='stack' />
      )}
      {isTypename(product, ['DownloadableProduct']) && (
        <DownloadableProductOptions product={product} />
      )}
      {isTypename(product, ['GroupedProduct']) && <GroupedProducts product={product} />}

      {!isTypename(product, ['GroupedProduct']) && (
        <>
          {/* <Divider />*/}
          <ProductPageAddToCartQuantityRow
            product={product}
            sx={{ flexDirection: 'column', alignItems: 'start' }}
          >
            <AddProductsToCartError>
              <Typography component='div' variant='h3' lineHeight='1'>
                <ProductListPrice
                  {...prodocutPrice.price_range.minimum_price}
                  sx={{
                    '& .ProductListPrice-finalPrice .MuiBox-root:nth-child(1)': {
                      // marginRight: '2px',
                      '& .mui-style-7b7t20': {
                        backgroundSize: '22px auto',
                        marginTop: '8px',
                      },
                    },
                    '& .ProductListPrice-finalPrice .MuiBox-root:not(:nth-child(1))': {
                      ...fontSize(25, 40),
                    },
                  }}
                />
              </Typography>
            </AddProductsToCartError>

            {cartEnabled && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column' },
                  columnGap: { xs: '12px', md: 0 },
                  rowGap: { xs: 0, md: '15px' },
                  alignItems: { xs: 'center', md: 'start' },
                }}
              >
                <Typography
                  component='p'
                  sx={{
                    color: '#2A110A',
                    fontSize: { xs: '15px', md: '16px' },
                    fontWeight: 500,
                  }}
                >
                  Quantity :
                </Typography>
                <AddProductsToCartQuantity
                  sx={{
                    flexShrink: '0',
                    '& .MuiOutlinedInput-root': {
                      color: '#333',
                      borderRadius: '8px',
                      padding: '4px',
                      '& svg': {
                        fontSize: '19px',
                      },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F6DBE0 ',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F6DBE0 ',
                    },
                    '& .mui-style-srbfbn-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: '#F6DBE0 ',
                      },
                  }}
                />
              </Box>
            )}
          </ProductPageAddToCartQuantityRow>
          <Box
            sx={{
              marginTop: { xs: '10px', md: '25px' },
              display: 'flex',
              flexDirection: 'column',
              rowGap: {
                xs: '8px',
                md: '12px',
              },
              '& .SectionHeader-root .SectionHeader-left': {
                color: '#2A110A ',
                fontSize: { xs: '15px', md: '16px' },
                textTransform: 'capitalize',
                fontWeight: 500,
              },
              '& .MuiFormControl-root .mui-style-1d3z3hw-MuiOutlinedInput-notchedOutline, .mui-style-9425fu-MuiOutlinedInput-notchedOutline':
                {
                  borderColor: (theme: any) => `${theme.palette.custom.border} !important`,
                },
              '& .MuiInputBase-root': {
                color: (theme: any) => theme.palette.custom.main,
              },
              '& .MuiFormHelperText-root': {
                marginLeft: '0',
                color: (theme: any) => theme.palette.custom.tertiary,
              },
              '& .mui-style-brh10v:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme: any) => `${theme.palette.custom.border} !important`,
              },
            }}
          >
            <ProductCustomizable product={product} />
          </Box>
          {/*  <ProductPagePriceTiers product={product} /> */}
          {/* cartEnabled && <ProductSidebarDelivery product={product} /> */}
        </>
      )}
    </>
  )
}
