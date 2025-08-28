import { Image } from '@graphcommerce/image'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { UpdateItemQuantity } from '@graphcommerce/magento-cart-items'
import { AddProductsToCartButton, AddProductsToCartForm } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { AdsOnProductsQuery } from '../../../graphql/AdsOnProduct.gql'
import { truncateByChars } from '../../../utils/truncate'

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
  const { data } = cart

  const allCategories = new Set<string>()
  adsOnData?.forEach((data) => {
    data.categories?.forEach((cat) => {
      if (cat.name !== 'Add On') allCategories.add(cat.name)
    })
  })

  const isMobile = useMediaQuery('(max-width:700px)')
  const uniqueCategories = Array.from(allCategories)
  const cartItems = data?.cart?.items
  const categoriesToShow = showAll ? uniqueCategories : uniqueCategories.slice(0, 2)

  return (
    <Box>
      <Typography
        sx={{
          color: (theme: any) => theme.palette.custom.dark,
          fontSize: { xs: '16px', md: '18px', lg: '20px' },
          lineHeight: '120%',
          marginBottom: { xs: '10px', md: '14px' },
        }}
      >
        Add On
      </Typography>

      <Box
        sx={{
          width: '100%',
          borderRadius: '8px',
          backgroundColor: 'white',
          padding: { xs: '16px 8px 20px', md: '27px 27px 14px' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {categoriesToShow?.map((cate, index) => {
            const filteredItems = adsOnData?.filter((item) =>
              item.categories?.some((cat) => cat.name === cate),
            )
            const isLast = index !== categoriesToShow.length - 1
            return (
              <Box
                key={index + 1}
                sx={{
                  borderBottom: isLast ? '1px solid #c7cacd6b' : 0,
                  paddingBottom: '18px',
                }}
              >
                <Typography
                  sx={{
                    color: (theme: any) => theme.palette.custom.main,
                    fontSize: { xs: '15px', md: '16px' },
                    fontWeight: 700,
                    marginBottom: { xs: '8px', md: '13px' },
                  }}
                >
                  {cate}
                </Typography>

                <Box
                  sx={{
                    //display: 'flex',
                    display: 'grid ',
                    gap: '8px',

                    gridTemplateColumns: {
                      xs: 'repeat(1,1fr)',
                      sm: 'repeat(2,1fr)',
                      xl: 'repeat(3,1fr)',
                      // xl: 'repeat(4,1fr)',
                    },
                    //flexWrap: 'wrap',
                    // flexDirection: { xs: 'column', sm: isMobile ? 'column' : 'row' },
                  }}
                >
                  {filteredItems?.map((item, i) => {
                    const matchedCartItem = cartItems?.find(
                      (cart) => cart?.product?.sku === item?.sku,
                    )

                    return (
                      <Box
                        key={item?.uid || i}
                        sx={{
                          borderRadius: '8px',
                          border: '1px solid #F6DBE0',
                          background: (theme: any) => theme.palette.primary.contrastText,
                          display: 'flex',
                          columnGap: '10px',
                          padding: { xs: '5px 25px 5px 5px', md: '5px 15px 5px 5px' },
                        }}
                      >
                        {/* Product image */}
                        <Box
                          sx={{
                            width: { xs: '62px', sm: '85px' },
                            height: { xs: '63px', sm: '100px' },
                            '& picture': {
                              display: 'inline-block',
                              width: { xs: '62px', sm: '85px' },
                              height: { xs: '63px', sm: '100px' },
                              overflow: 'hidden',
                              borderRadius: '8px',
                            },
                          }}
                        >
                          <Image
                            src={item?.small_image?.url}
                            alt={item?.small_image?.label}
                            height={100}
                            width={85}
                            sx={{
                              width: '85px',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                        </Box>

                        {/* Product info + actions */}
                        <Box
                          sx={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: { xs: 'row', sm: 'column' },
                            justifyContent: { xs: 'space-between', sm: 'flex-start' },
                            alignItems: { xs: 'center', sm: 'center' },
                          }}
                        >
                          {/* Product name + price */}
                          <Box
                            sx={{
                              marginRight: 'auto',
                            }}
                          >
                            <Typography
                              sx={{
                                color: (theme: any) => theme.palette.custom.smallHeading,
                                fontSize: { xs: '15px', md: '16px' },
                                lineHeight: '164%',
                                minHeight: { lg: '50px', xl: '30px' },
                                marginBottom: '2px',
                              }}
                              title={item?.name}
                            >
                              {/*truncateByChars(item?.name, 20)*/}
                              {item?.name}
                            </Typography>
                            <Box
                              className='adsOn'
                              sx={{
                                ['& span']: {
                                  fontSize: { xs: '15px', md: '16px', lg: '20px' },
                                  lineHeight: '24px',
                                  fontWeight: '700',
                                  color: (theme: any) => theme.palette.custom.dark,
                                  ['&:first-child']: { paddingRight: '6px' },
                                },
                              }}
                            >
                              <Money
                                value={item?.price_range?.minimum_price?.regular_price?.value}
                                currency={item?.price_range?.minimum_price?.regular_price?.currency}
                              />
                            </Box>
                          </Box>

                          {/* Cart action */}
                          <Box
                            sx={{
                              marginTop: { xs: '0', md: '4px' },
                              marginRight: { xs: '0', sm: 'auto' },
                            }}
                          >
                            {matchedCartItem ? (
                              <UpdateItemQuantity
                                sx={{
                                  flexShrink: '0',
                                  maxWidth: '100px',
                                  '& .MuiOutlinedInput-root': {
                                    color: '#333',
                                    borderRadius: '8px',
                                    '& input': {
                                      padding: { xs: '5.5px 5px', md: '8.5px 0px' },
                                    },
                                  },
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: (theme: any) => theme.palette.custom.border,
                                  },
                                  '& .MuiButtonBase-root': {
                                    color: '#333333',
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    '& svg': { fontSize: '17px' },
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
                            ) : item.__typename === 'SimpleProduct' ? (
                              <AddProductsToCartForm key={item.uid}>
                                <AddProductsToCartButton
                                  isAdson={true}
                                  sx={{
                                    backgroundColor: (theme: any) => theme.palette.custom.heading,
                                    color: '#FFFFFF',
                                    fontSize: { xs: '15px', md: '16px' },
                                    borderRadius: '8px',
                                    border: '1px solid #9B7C38 ',
                                    paddingBlock: { xs: '5px' },
                                    boxShadow: 'none !important',
                                    width: '100%',
                                    maxWidth: '90px',
                                    '&:hover': {
                                      backgroundColor: 'white !important',
                                      color: (theme: any) => theme.palette.custom.main,
                                    },
                                  }}
                                  product={item}
                                />
                              </AddProductsToCartForm>
                            ) : (
                              <Link href={`/p/${item.url_key}`}>
                                <Button
                                  sx={{
                                    display: 'inline-block',
                                    backgroundColor: '#9B7C38',
                                    border: '1px solid #9B7C38 ',
                                    color: '#fff',
                                    fontSize: { xs: '15px', md: '16px' },
                                    fontWeight: 500,
                                    borderRadius: '8px',
                                    // padding: '6px 12px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    paddingBlock: { xs: '5px' },
                                    width: '100%',
                                    minWidth: '90px',
                                    '&:hover': {
                                      backgroundColor: 'white !important',
                                      color: (theme: any) => theme.palette.custom.main,
                                    },
                                  }}
                                >
                                  Add
                                </Button>
                              </Link>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Toggle View More / Less */}
        <Box
          onClick={() => setShowAll((prev) => !prev)}
          sx={{
            marginTop: { xs: '15px', md: '26px' },
            color: (theme: any) => theme.palette.custom.dark,
            fontSize: { xs: '15px' },
            textDecoration: 'underline',
            textAlign: 'center',
            transition: 'all 0.4s ease-in-out',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'none' },
          }}
        >
          {showAll ? 'View Less' : 'View'}
        </Box>
      </Box>
    </Box>
  )
}

export default AdsOnProduct
