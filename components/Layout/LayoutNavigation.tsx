import { CartFab /* , useCartEnabled */ } from '@graphcommerce/magento-cart'
// import { magentoMenuToNavigation } from '@graphcommerce/magento-category'
import { CustomerFab /*  CustomerMenuFabItem  */ } from '@graphcommerce/magento-customer'
import { SearchFab, SearchField } from '@graphcommerce/magento-search'
import { WishlistFab /* , WishlistMenuFabItem  */ } from '@graphcommerce/magento-wishlist'
import type { LayoutDefaultProps } from '@graphcommerce/next-ui'
import {
  // DarkLightModeMenuSecondaryItem,
  DesktopNavActions,
  DesktopNavBar,
  DesktopNavItem,
  // iconChevronDown,
  // iconCustomerService,
  iconHeart,
  IconSvg,
  LayoutDefault,
  // MenuFabSecondaryItem,
  MobileTopRight,
  // NavigationFab,
  // NavigationOverlay,
  // NavigationProvider,
  // PlaceholderFab,
  // useMemoDeep,
  // useNavigationSelection,
} from '@graphcommerce/next-ui'
// import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
// import { /*  Divider,*/ Fab } from '@mui/material'
import { useRouter } from 'next/router'
import { productListRenderer } from '../ProductListItems/productListRenderer'
import { Footer } from './Footer'
// import { Footer } from './Footer'
import type { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, ...uiProps } = props

  console.log('this is menu', menu)

  // const selection = useNavigationSelection()
  const router = useRouter()

  // const cartEnabled = useCartEnabled()

  return (
    <>
      {/*  <NavigationProvider
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
        {...uiProps}
        noSticky={router.asPath.split('?')[0] === '/'}
        header={
          <>
            <Logo isHome />

            <DesktopNavBar>
              <DesktopNavItem href='/cakes'>
                <Trans id='Cakes' />
              </DesktopNavItem>

              <DesktopNavItem href='/jars'>
                <Trans id='Jars' />
              </DesktopNavItem>

              <DesktopNavItem href='/chefs-special'>
                <Trans id="Chef's  Special" />
              </DesktopNavItem>

              <DesktopNavItem href='/mini-bites'>
                <Trans id='Mini Bites' />
              </DesktopNavItem>

              <DesktopNavItem href='/custimized-cake'>
                <Trans id='Customized Cake' />
              </DesktopNavItem>

              <DesktopNavItem href='/gifts'>
                <Trans id='Gifts' />
              </DesktopNavItem>

              <DesktopNavItem href='/eid-treats'>
                <Trans id='Eid Treats' />
              </DesktopNavItem>
            </DesktopNavBar>

            <DesktopNavActions>
              <SearchField
                formControl={{ sx: { width: '400px' } }}
                searchField={{ productListRenderer }}
                fab={{
                  sx: {
                    backgroundColor: '#F6DBE0',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    color: '#441E14',
                    '&:hover': {
                      backgroundColor: '#F6DBE0',
                    },
                  },
                }}
              />

              <WishlistFab
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  color: '#441E14',
                  backgroundColor: '#f6dbe0',
                  '&:hover': {
                    backgroundColor: '#f6dbe0',
                  },
                }}
                icon={<IconSvg src={iconHeart} size='medium' />}
              />
              <CustomerFab
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  color: '#441E14',
                  backgroundColor: '#f6dbe0',
                  '&:hover': {
                    backgroundColor: '#f6dbe0',
                  },
                }}
                guestHref='/account/signin'
                authHref='/account'
              />

              <CartFab
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  color: '#441E14',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f6dbe0',
                  '&:hover': {
                    backgroundColor: '#f6dbe0',
                  },
                }}
              />
              {/* The placeholder exists because the CartFab is sticky but we want to reserve the space for the <CartFab />   {cartEnabled && <PlaceholderFab />}*/}
            </DesktopNavActions>

            <MobileTopRight>
              <SearchFab size='responsiveMedium' />
            </MobileTopRight>
          </>
        }
        footer={<Footer />}
        // cartFab={<CartFab BadgeProps={{ color: 'secondary' }} />}
        // menuFab={<NavigationFab onClick={() => selection.set([])} />}
      >
        {children}
      </LayoutDefault>
    </>
  )
}
