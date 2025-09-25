
import { useCartEnabled } from '@graphcommerce/magento-cart'
import {
  AddProductsToCartError,
  AddProductsToCartQuantity,
  AddToCartItemSelector,
  ProductCustomizable,
  ProductListPrice,
  ProductPageAddToCartQuantityRow,
  // ProductPagePrice,
  // ProductPagePriceTiers,                                                         
  // ProductSidebarDelivery,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import {
  ConfigurableProductOptions,
  useConfigurableOptionsSelection,
} from '@graphcommerce/magento-product-configurable'
import { DownloadableProductOptions } from '@graphcommerce/magento-product-downloadable'
import { GroupedProducts } from '@graphcommerce/magento-product-grouped'
import { isTypename } from '@graphcommerce/next-ui'
import { Box, Button, Typography } from '@mui/material'
import { useWatch } from 'react-hook-form'
import type { ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { fontSize } from '../theme'
import { IoMdArrowForward } from 'react-icons/io';



export type AddProductsToCartViewProps = AddToCartItemSelector & {
  product: NonNullable<NonNullable<NonNullable<ProductPage2Query['products']>['items']>[number]>
  openForm?: any
}

export function AddProductsToCartView(props: AddProductsToCartViewProps) {

  const { product, openForm, index = 0 } = props
  const cartEnabled = useCartEnabled()
  const { configured } = useConfigurableOptionsSelection({ url_key: product?.url_key, index })

  const { control } = useFormAddProductsToCart()
  const currentQuantity = useWatch({
    control,
    name: `cartItems.${index}.quantity`,
    defaultValue: 1,
  })

  const productConfiguredPrice =
    configured && 'configurable_product_options_selection' in configured
      ? (configured as { configurable_product_options_selection?: { variant?: any } })
        .configurable_product_options_selection?.variant
      : undefined

  const productPrice = productConfiguredPrice ? productConfiguredPrice : product

  const unitPrice = productPrice.price_range.minimum_price.final_price.value || 0
  const totalPrice = unitPrice * (currentQuantity || 1)

  // Create a modified price object for display
  const displayPrice = {
    ...productPrice.price_range.minimum_price,
    final_price: {
      ...productPrice.price_range.minimum_price.final_price,
      value: totalPrice,
    },
    regular_price: productPrice.price_range.minimum_price.regular_price
      ? {
        ...productPrice.price_range.minimum_price.regular_price,
        value:
          (productPrice.price_range.minimum_price.regular_price.value || 0) *
          (currentQuantity || 1),
      }
      : undefined,
  }



  const customizableProduct = product?.categories && product?.categories?.length > 0 && product?.categories?.some((item) => item?.id === 11)




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
                  {...displayPrice}
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

            {customizableProduct && (
              <Box sx={{
                borderTop: '1px solid #c7cacd6b',
                width: '100%',
                marginTop: { xs: '10px' },
                paddingTop: { xs: '25px' },
              }}><Button
                onClick={() => openForm(true)}
                sx={{
                  borderRadius: '8px',
                  border: (theme) => `1px solid ${theme.palette.custom.main}`,
                  background: theme => theme.palette.custom.border,
                  fontSize: { xs: '16px', md: '18px' },
                  color: theme => theme.palette.custom.smallHeading,
                  fontWeight: 600,
                  width: '100%',
                  paddingBlock: { xs: '16px' },
                  textAlign: 'center',
                  marginBottom: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '10px',
                  transition: 'transform 0.3s ease-in-out',
                  '& svg': {
                    transform: 'translateX(0)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                  '&:hover': {
                    background: theme => theme.palette.custom.border,
                    '& svg': {
                      transform: 'translateX(5px)',
                    },
                  },

                }}>Contact us for your customised cake <IoMdArrowForward color='#1C1B1F' />
                </Button> </Box>
            )}

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
