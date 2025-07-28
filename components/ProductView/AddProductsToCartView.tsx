import { start } from 'repl'
import { useCartEnabled } from '@graphcommerce/magento-cart'
import {
  AddProductsToCartError,
  AddProductsToCartQuantity,
  ProductCustomizable,
  ProductListPrice,
  ProductPageAddToCartQuantityRow,
  ProductPagePrice,
  ProductPagePriceTiers,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import { ConfigurableProductOptions } from '@graphcommerce/magento-product-configurable'
import { DownloadableProductOptions } from '@graphcommerce/magento-product-downloadable'
import { GroupedProducts } from '@graphcommerce/magento-product-grouped'
import { isTypename } from '@graphcommerce/next-ui'
import { Box, Divider, Typography } from '@mui/material'
import type { ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { fontSize } from '../theme'

export type AddProductsToCartViewProps = {
  product: NonNullable<NonNullable<NonNullable<ProductPage2Query['products']>['items']>[number]>
}

export function AddProductsToCartView(props: AddProductsToCartViewProps) {
  const { product } = props
  const cartEnabled = useCartEnabled()

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
                  {...product.price_range.minimum_price}
                  sx={{
                    '& .ProductListPrice-finalPrice .MuiBox-root:nth-child(1)': {
                      marginRight: '2px',
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
                    fontSize: '16px',
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
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F6DBE0 ',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F6DBE0 ',
                    },
                  }}
                />
              </Box>
            )}
          </ProductPageAddToCartQuantityRow>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: {
                xs: '8px',
                md: '12px',
                '& .MuiBox-root .SectionHeader-left': {
                  color: '#2A110A ',
                  fontSize: '16px',
                  fontWeight: 'normal',
                  textTransform: 'capitalize',
                },
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
