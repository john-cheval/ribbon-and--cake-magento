// import { Image } from '@graphcommerce/image'
import { CartFab /* , useCartEnabled */ } from '@graphcommerce/magento-cart'
import { magentoMenuToNavigation } from '@graphcommerce/magento-category'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { SearchFab, SearchField } from '@graphcommerce/magento-search'
import { WishlistFab, WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import type { LayoutDefaultProps } from '@graphcommerce/next-ui'
import {
  DarkLightModeMenuSecondaryItem,
  DesktopNavActions,
  DesktopNavBar,
  DesktopNavItem,
  // iconChevronDown,
  iconCustomerService,
  iconHeart,
  IconSvg,
  LayoutDefault,
  MenuFabSecondaryItem,
  MobileTopRight,
  // NavigationFab,
  NavigationOverlay,
  NavigationProvider,
  // PlaceholderFab,
  useMemoDeep,
  useNavigationSelection,
} from '@graphcommerce/next-ui'
// import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Divider, Fab, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
//import { FaWhatsapp } from 'react-icons/fa6'
//import { GoHome } from 'react-icons/go'
//import { IoMenuSharp } from 'react-icons/io5'
//import { MdOutlineInterests } from 'react-icons/md'
//import { AiOutlineShopping } from 'react-icons/ai'
import personicon from '../../assets/personicon.svg'
import { productListRenderer } from '../ProductListItems/productListRenderer'
import { Footer } from './Footer'
// import { Footer } from './Footer'
import type { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'
import MobileMenu from './MobileMenu/MobileMenu'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, ...uiProps } = props

  const [scroll, setScroll] = useState<boolean>(false)

  const selection = useNavigationSelection()
  const router = useRouter()

  // const cartEnabled = useCartEnabled()

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    // return window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/*   <NavigationProvider
        selection={selection}
        items={useMemoDeep(
          () => [
            { id: 'home', name: <Trans id='Home' />, href: '/' },
            {
              id: 'manual-item-one',
              href: `/${menu?.items?.[0]?.children?.[0]?.url_path}`,
              name: menu?.items?.[0]?.children?.[0]?.name ?? '',
            },
            {
              id: 'manual-item-two',
              href: `/${menu?.items?.[0]?.children?.[1]?.url_path}`,
              name: menu?.items?.[0]?.children?.[1]?.name ?? '',
            },
            ...magentoMenuToNavigation(menu, true),
            { id: 'blog', name: 'Blog', href: '/blog' },
            <Divider sx={(theme) => ({ my: theme.spacings.xs })} />,
            <CustomerMenuFabItem
              onClick={() => selection.set(false)}
              key='account'
              guestHref='/account/signin'
              authHref='/account'
            >
              <Trans id='Account' />
            </CustomerMenuFabItem>,
            <MenuFabSecondaryItem
              key='service'
              icon={<IconSvg src={iconCustomerService} size='medium' />}
              href='/service'
            >
              <Trans id='Customer Service' />
            </MenuFabSecondaryItem>,
            <WishlistMenuFabItem
              onClick={() => selection.set(false)}
              key='wishlist'
              icon={<IconSvg src={iconHeart} size='medium' />}
            >
              <Trans id='Wishlist' />
            </WishlistMenuFabItem>,
            <DarkLightModeMenuSecondaryItem key='darkmode' />,
          ],
          [menu, selection],
        )}
      >
        <NavigationOverlay
          stretchColumns={false}
          variantSm='left'
          sizeSm='full'
          justifySm='start'
          itemWidthSm='70vw'
          variantMd='left'
          sizeMd='full'
          justifyMd='start'
          itemWidthMd='230px'
          mouseEvent='hover'
          itemPadding='md'
        />
      </NavigationProvider> */}

      <LayoutDefault
        sx={{
          position: 'sticky',
          top: '0',
          left: '0',
          width: '100%',
          // paddingLeft:''
          ['& .LayoutDefault-header']: {
            height: { xs: '65px', md: '80px' },
            paddingInline: { xs: '18px', md: '25px', xl: '55px' },

            ...(scroll ? { boxShadow: '0px -9px 24px #000000' } : {}),
          },
        }}
        {...uiProps}
        // noSticky={router.asPath.split('?')[0] === '/'}
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
                      // padding: { lg: '5px 8px', xl: '8px 16px' },
                      borderRadius: '999px',
                      fontSize: '16px',
                      '&:hover': {
                        backgroundColor: '#F6DBE0',
                      },
                    }}
                    key={menus?.uid}
                    href={`/${menus?.url_path}`}
                  >
                    {menus?.name}
                  </DesktopNavItem>
                ))}
            </DesktopNavBar>

            <DesktopNavActions>
              <SearchField
                formControl={{ sx: { width: '400px' } }}
                searchField={{ productListRenderer }}
                fab={{
                  sx: {
                    backgroundColor: '#F6DBE0',
                    borderRadius: '50%',
                    width: { xs: '35px', md: '35px', xl: '40px' },
                    height: { xs: '30px', md: '35px', xl: '40px' },
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#441E14',
                    '&:hover, &:focus': {
                      backgroundColor: '#F6DBE0',
                    },
                    ['& .MuiBadge-root']: {
                      left: '5px',
                      top: '5px',
                    },
                    '&  svg': {
                      fontSize: { lg: '25px', xl: '28px' },
                      stroke: 'unset !important',
                    },
                  },
                }}
              />

              <WishlistFab
                sx={{
                  width: { xs: '35px', xl: '40px' },
                  height: { xs: '30px', md: '35px', xl: '40px' },
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#441E14',
                  backgroundColor: '#f6dbe0',
                  '&  svg': {
                    fontSize: { xs: '20px', xl: '24px' },
                    strokeWidth: '1.5',
                  },
                  '&:hover, &:focus ': {
                    backgroundColor: '#f6dbe0',
                  },

                  // ['& .MuiBadge-root']: {
                  //   left: '5px',
                  //   top: '5px',
                  // },
                }}
                // icon={
                //   <Image src={iconHeart} alt='iconHeart' layout='fill' width={24} height={24} />
                // }
                icon={<IconSvg src={iconHeart} size='medium' sx={{ stroke: '#441E14' }} />}
              />
              <CustomerFab
                sx={{
                  width: { md: '35px', xl: '40px' },
                  height: { md: '35px', xl: '40px' },
                  borderRadius: '50%',
                  color: '#441E14',
                  display: { xs: 'none', lg: 'inline-flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f6dbe0',
                  '&  svg': {
                    // width: '1em',
                    fontSize: { md: '20px', lg: '25px', xl: '28px' },
                    stroke: 'unset !important',
                  },
                  '&:hover, &:focus': {
                    backgroundColor: '#f6dbe0',
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
                  color: '#441E14',
                  width: { md: '35px', xl: '40px' },
                  height: { md: '35px', xl: '40px' },
                  borderRadius: '50%',
                  backgroundColor: '#f6dbe0',
                  '&:hover, &:focus': {
                    backgroundColor: '#f6dbe0',
                  },
                  ['& .MuiBadge-root']: {
                    left: '8px',
                    top: '3px',
                  },
                  '& svg': {
                    fontSize: { md: '27px', xl: '30px' },
                    stroke: 'unset !important',
                  },
                }}
              />
              {/* The placeholder exists because the CartFab is sticky but we want to reserve the space for the <CartFab />   {cartEnabled && <PlaceholderFab />}*/}
            </DesktopNavActions>

            {/*<MobileTopRight>
              <SearchFab size='responsiveMedium' />
            </MobileTopRight>*/}
          </>
        }
        footer={<Footer />}
        // cartFab={<CartFab BadgeProps={{ color: 'secondary' }} />}
        // menuFab={<NavigationFab onClick={() => selection.set([])} />}
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
        <MobileMenu />
      </Box>
    </>
  )
}
