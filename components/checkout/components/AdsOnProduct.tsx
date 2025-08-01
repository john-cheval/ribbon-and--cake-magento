import { Image } from '@graphcommerce/image'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { UpdateItemQuantity } from '@graphcommerce/magento-cart-items'
import { AddProductsToCartButton, AddProductsToCartForm } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { AdsOnProductsQuery } from '../../../graphql/AdsOnProduct.gql'

export type AdsOnProductType = {
  adsOnData?: AdsOnProductsQuery[] | any[]
}

function AdsOnProduct(props: AdsOnProductType) {
  const { adsOnData } = props
  const [showAll, setShowAll] = useState(false)
  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const { error, data } = cart

  const allCategories = new Set<string>()

  adsOnData?.forEach((data) => {
    data.categories?.forEach((cat) => {
      if (cat.name !== 'Add On') {
        allCategories.add(cat.name)
      }
    })
  })

  const uniqueCategories = Array.from(allCategories)
  const cartItems = data?.cart?.items
  return (
    <Box>
      <Typography
        sx={{
          color: (theme: any) => theme.palette.custom.dark,
          fontsize: { xs: '16px', md: '20px' },
          lineHeight: '120%',
          marginBottom: { xs: '10px', md: '14px' },
        }}
      >
        Add On
      </Typography>
      <Box
        sx={{
          width: '100%',
          // height: '380px',
          borderRadius: '8px',
          backgroundColor: 'white',
          padding: { xs: '16px 8px 20px', md: '27px 27px 14px' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {uniqueCategories.map((cate, index) => {
            const filteredItems = adsOnData?.filter((item) =>
              item.categories?.some((cat) => cat.name === cate),
            )

            const itemsToShow = showAll ? filteredItems : filteredItems?.slice(0, 3)

            return (
              <Box key={index + 1}>
                <Typography
                  sx={{
                    color: (theme: any) => theme.palette.custom.main,
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    fontWeight: 700,
                    marginBottom: { xs: '8px', md: '13px' },
                  }}
                >
                  {cate}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  {itemsToShow &&
                    itemsToShow?.map((item, i) => (
                      <Box
                        key={item?.uid || i}
                        sx={{
                          borderRadius: '8px',
                          border: '1px solid #F6DBE0',
                          background: (theme: any) => theme.palette.primary.contrastText,
                          display: 'flex',
                          columnGap: '8px',
                          padding: { xs: '5px 25px 5px 5px', md: '5px 15px 5px 5px' },
                        }}
                      >
                        <Box>
                          <Image
                            src={item?.small_image?.url}
                            alt={item?.small_image?.label}
                            height={100}
                            width={85}
                            sx={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              maxHeight: '100px',
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: {
                              xs: 'row',
                              md: 'column',
                            },
                            justifyContent: {
                              xs: 'space-between',
                              md: 'flex-start',
                            },
                            alignItems: {
                              xs: 'center',
                              md: 'center',
                            },
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                color: (theme: any) => theme.palette.custom.smallHeading,
                                fontSize: { xs: '12px', sm: '14px', md: '16px' },
                                lineHeight: '164%',
                                minHeight: { lg: '50px', xl: 0 },
                              }}
                            >
                              {item?.name}
                            </Typography>
                            <Box
                              sx={{
                                ['& span']: {
                                  fontSize: { xs: '14px', md: '16px', lg: '20px' },
                                  lineHeight: '24px',
                                  fontWeight: '700',
                                  color: (theme: any) => theme.palette.custom.dark,
                                  ['&:first-child']: {
                                    paddingRight: '6px',
                                  },
                                },
                              }}
                            >
                              <Money
                                value={item?.price_range?.minimum_price?.regular_price?.value}
                                currency={item?.price_range?.minimum_price?.regular_price?.currency}
                              />
                            </Box>
                          </Box>

                          <Box sx={{ marginTop: { xs: '0', md: '10px' } }}>
                            {(() => {
                              const matchedCartItem = cartItems?.find(
                                (cart) => cart?.product?.sku === item?.sku,
                              )

                              return matchedCartItem ? (
                                <UpdateItemQuantity
                                  sx={{
                                    flexShrink: '0',
                                    '& .MuiOutlinedInput-root': {
                                      color: '#333',
                                      borderRadius: '8px',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: (theme: any) => theme.palette.custom.border,
                                    },
                                    '& .MuiButtonBase-root': {
                                      color: '#333333',
                                      fontSize: '18px',
                                      fontWeight: 500,
                                    },
                                    '& .MuiInputBase-input': {
                                      color: '#333333',
                                      fontWeight: '500',
                                      fontSize: '18px',
                                    },
                                  }}
                                  uid={matchedCartItem.uid}
                                  quantity={matchedCartItem.quantity}
                                />
                              ) : (
                                <AddProductsToCartForm key={item.uid}>
                                  <AddProductsToCartButton
                                    sx={{
                                      backgroundColor: (theme: any) => theme.palette.custom.heading,
                                      color: '#FFFFFF',
                                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                                      borderRadius: '8px',
                                      border: '1px solid #9B7C38 ',
                                      paddingBlock: { xs: '5px' },
                                      boxShadow: 'none !important',
                                      width: '100%',
                                      '&:hover': {
                                        backgroundColor: 'white !important',
                                        color: (theme: any) => theme.palette.custom.main,
                                      },
                                    }}
                                    product={item}
                                  >
                                    Add
                                  </AddProductsToCartButton>
                                </AddProductsToCartForm>
                              )
                            })()}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            )
          })}
        </Box>

        <Box
          onClick={() => setShowAll((prev) => !prev)}
          sx={{
            marginTop: { xs: '15px', md: '26px' },
            color: (theme: any) => theme.palette.custom.dark,
            fontSize: { xs: '12px', md: '14px' },
            textDecoration: 'underline',
            textAlign: 'center',
            transition: 'all 0.4s ease-in-out',
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          {showAll ? 'View Less' : 'View'}
        </Box>
      </Box>
    </Box>
  )
}

export default AdsOnProduct
