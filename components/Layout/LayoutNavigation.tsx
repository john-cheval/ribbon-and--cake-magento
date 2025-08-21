import { CartFab } from '@graphcommerce/magento-cart'
import { CustomerFab } from '@graphcommerce/magento-customer'
import { SearchField } from '@graphcommerce/magento-search'
import { WishlistFab } from '@graphcommerce/magento-wishlist'
import type { LayoutDefaultProps } from '@graphcommerce/next-ui'
import {
  DesktopNavActions,
  DesktopNavBar,
  DesktopNavItem,
  iconHeart,
  IconSvg,
  LayoutDefault,
} from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { decodeHtmlEntities } from '../../utils/htmlUtils'
import { productListRenderer } from '../ProductListItems/productListRenderer'
import { Footer } from './Footer'
import type { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'
import MobileMenu from './MobileMenu/MobileMenu'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, ...uiProps } = props

  const footerCmsData = props?.footer?.items?.[0]
  const menuItemsCmsData = props?.menu?.items?.[0]?.children
  const decodedFooterData = decodeHtmlEntities(footerCmsData?.content)
  const [scroll, setScroll] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    // return window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <LayoutDefault
        sx={{
          position: 'sticky',
          top: '0',
          left: '0',
          width: '100%',
          ['& .LayoutDefault-header']: {
            height: { xs: '65px', md: '80px', lg: '90px' },
            paddingInline: { xs: '18px', md: '25px', lg: '55px' },
            boxShadow: { xs: '0px -9px 24px #00000026', md: 'none' },

            ...(scroll ? { boxShadow: '0px -9px 24px #00000026' } : {}),
          },
        }}
        {...uiProps}
        header={
          <>
            <Logo isHome />

            <DesktopNavBar>
              {menu?.items?.[0]?.children
                ?.filter((item) => item?.include_in_menu === 1)
                ?.map((menus) => (
                  <DesktopNavItem
                    sx={{
                      transition: 'all 0.4s ease',
                      borderRadius: '999px',
                      fontSize: '16px',
                      border: '1px solid transparent',
                      fontWeight: 300,
                      lineHeight: 'normal !important',
                      '&:hover': {
                        border: '1px solid #F6DBE0',
                      },
                    }}
                    key={menus?.uid}
                    href={`/${menus?.url_path}`}
                  >
                    {menus?.name}
                  </DesktopNavItem>
                ))}
              <DesktopNavItem
                sx={{
                  transition: 'all 0.4s ease',
                  borderRadius: '999px',
                  fontSize: '16px',
                  border: '1px solid transparent',
                  fontWeight: 300,
                  lineHeight: 'normal !important',
                  '&:hover': {
                    border: '1px solid #F6DBE0',
                  },
                }}
                href={`/events`}
              >
                Corporate & Events
              </DesktopNavItem>
              <DesktopNavItem
                sx={{
                  transition: 'all 0.4s ease',
                  borderRadius: '999px',
                  fontSize: '16px',
                  border: '1px solid transparent',
                  fontWeight: 300,
                  lineHeight: 'normal !important',
                  '&:hover': {
                    border: '1px solid #F6DBE0',
                  },
                }}
                href={`/courses`}
              >
                Baking Classes
              </DesktopNavItem>
            </DesktopNavBar>

            <DesktopNavActions
              sx={{
                '& .MuiformControl': {
                  border: 'none',
                },
              }}
            >
              <SearchField
                formControl={{
                  sx: {
                    width: { xs: 'fit-content', sm: '300px', lg: '250px', xl: '350px' },
                    color: (theme: any) => theme.palette.custom.main,
                    '& .MuiOutlinedInput-root': {
                      color: (theme) => theme.palette.custom.main,
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      borderRadius: '4px',
                      '& input': {
                        padding: {
                          xs: '8px 12px',
                          sm: '10px 12px',
                          lg: '12px 14px',
                          xl: '15px 14px',
                        },
                      },
                      '& .MuiOutlinedInput-input, & .MuiOutlinedInput-input::placeholder': {
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '158%',
                        color: (theme: any) => theme.palette.custom.main,
                        opacity: 1,
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme: any) => theme.palette.custom.borderInput,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme: any) => theme.palette.custom.borderInput,
                      },

                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme: any) => theme.palette.custom.borderInput,
                        borderWidth: '1px !important',
                      },
                      '& .MuiButtonBase-root': {
                        '&:hover': {
                          // backgroundColor: (theme) => theme.palette.custom.wishlistColor,
                        },
                        '& svg': {
                          color: (theme) => theme.palette.custom.main,
                          fontSize: '22px',
                        },
                      },
                    },
                  },
                }}
                searchField={{ productListRenderer }}
                fab={{
                  sx: {
                    backgroundColor: (theme) => theme.palette.custom.border,
                    borderRadius: '50%',
                    width: { xs: '35px', md: '36px' },
                    height: { xs: '30px', md: '35px' },
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: (theme) => theme.palette.custom.main,
                    border: (theme) => `1px solid ${theme.palette.custom.border}`,
                    transition: 'all 0.4s ease-in-out',
                    //  '& .'
                    '&:focus': {
                      backgroundColor: (theme) => theme.palette.custom.border,
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },

                    ['& .MuiBadge-root']: {
                      left: '6px',
                      top: '5px',
                    },
                    '&  svg': {
                      fontSize: { lg: '24px' },
                      stroke: 'unset !important',
                    },
                  },
                }}
              />

              <WishlistFab
                sx={{
                  width: { xs: '36px' },
                  height: { xs: '30px', md: '36px' },
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: (theme) => theme.palette.custom.main,
                  backgroundColor: (theme) => theme.palette.custom.border,
                  border: (theme) => `1px solid ${theme.palette.custom.border}`,
                  '&  svg': {
                    fontSize: { xs: '19px' },
                    strokeWidth: '1.5',
                  },
                  ' &:focus ': {
                    backgroundColor: (theme) => theme.palette.custom.border,
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                icon={
                  <IconSvg
                    src={iconHeart}
                    size='medium'
                    sx={{ stroke: (theme) => theme.palette.custom.main }}
                  />
                }
              />
              <CustomerFab
                sx={{
                  width: { md: '36px' },
                  height: { md: '35px' },
                  borderRadius: '50%',
                  color: (theme) => theme.palette.custom.main,
                  display: { xs: 'none', lg: 'inline-flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: (theme) => theme.palette.custom.border,
                  border: (theme) => `1px solid ${theme.palette.custom.border}`,

                  '&  svg': {
                    // width: '1em',
                    fontSize: { md: '22px' },
                    stroke: 'unset !important',
                  },
                  '&:focus': {
                    backgroundColor: (theme) => theme.palette.custom.border,
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  ['& .MuiBadge-root']: {
                    left: '5px',
                    top: '3px',
                    '& .MuiBadge-dot': {
                      display: 'none',
                    },
                  },
                }}
                guestHref='/account/signin'
                authHref='/account'
              />

              <CartFab
                sx={{
                  display: { xs: 'none', lg: 'inline-flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: (theme) => theme.palette.custom.main,
                  width: { md: '38px' },
                  height: { md: '37px' },
                  borderRadius: '50%',
                  backgroundColor: (theme) => theme.palette.custom.border,
                  border: (theme) => `1px solid ${theme.palette.custom.border}`,
                  transition: 'all 0.4s ease-in-out',
                  '&:focus': {
                    backgroundColor: (theme) => theme.palette.custom.border,
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  ['& .MuiBadge-root']: {
                    left: '6px',
                    top: '2px',

                    '& .MuiBadge-badge': {
                      top: '3px',
                      right: '11px',
                    },
                  },
                  '& svg': {
                    fontSize: { md: '25px' },
                    stroke: 'unset !important',
                  },
                  '& .MuiButtonBase-root': {
                    height: 'unset !important',
                    width: 'unset !important',
                    boxShadow: 'none',
                    backgroundColor: 'transparent !important',
                  },
                  '& .mui-style-1jnnhmg-MuiButtonBase-root-MuiFab-root': {
                    minHeight: 'unset',
                    boxShadow: 'none',
                    backgroundcolor: 'transparent',
                    transition: 'unset',
                  },
                }}
              />
            </DesktopNavActions>
          </>
        }
        footer={<Footer footerContent={decodedFooterData} />}
      >
        {children}
      </LayoutDefault>

      <Box
        sx={{
          backgroundColor: '#f6e1e5',
          paddingInline: { xs: '18px', md: '25px', lg: '55px' },
          display: { xs: 'flex', lg: 'none' },
          paddingBlock: { xs: '16px', md: '20px' },
          color: (theme: any) => theme.palette.custom.main,
          justifyContent: 'space-between',
          columnGap: '20px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: '999999',
          alignItems: 'center',
          height: '80px',
          width: '100%',
        }}
      >
        <MobileMenu ShopCategories={menuItemsCmsData} />
      </Box>
    </>
  )
}
