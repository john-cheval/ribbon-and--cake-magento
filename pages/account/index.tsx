import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, useQuery } from '@graphcommerce/graphql'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
  AddressSingleLine,
  getCustomerAccountIsDisabled,
  OrderStateLabelInline,
  SignOutForm,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CustomerNewsletterToggle } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  iconBin,
  iconBox,
  iconEmailOutline,
  iconHome,
  iconId,
  iconLock,
  iconNewspaper,
  iconPerson,
  iconShutdown,
  iconStar,
  LayoutHeader,
  LayoutTitle,
  RelativeToTimeFormat,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container } from '@mui/material'
import type { LayoutMinimalProps } from '../../components'
import { LayoutDocument, LayoutMinimal } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function AccountIndexPage() {
  const dashboard = useCustomerQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const customer = dashboard.data?.customer
  const address =
    customer?.addresses?.filter((a) => a?.default_shipping)?.[0] || customer?.addresses?.[0]
  const orders = customer?.orders
  const latestOrder = orders?.items?.[(orders?.items?.length ?? 1) - 1]

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Account')} metaRobots={['noindex']} />

      <LayoutHeader
        sx={{
          '& .LayoutHeaderContent-content': {
            '& .LayoutTitle-root': {
              gap: { xs: '10px' },
              '& svg': {
                fontSize: { xs: '23px' },
                stroke: (theme) => theme.palette.custom.wishlistColor,
                display: 'none',
              },
              '& .MuiTypography-h6': {
                color: (theme) => theme.palette.custom.heading,
                fontFamily: 'Saxo Grammaticus',
                fontWeight: 300,
              },
            },
          },
        }}
      >
        <LayoutTitle component='span' size='small' variant='h2' icon={iconPerson}>
          <Trans id='Account' />
        </LayoutTitle>
      </LayoutHeader>

      <WaitForCustomer waitFor={dashboard}>
        <Container
          maxWidth='md'
          sx={{
            '& .LayoutTitle-root ': {
              marginBlock: 0,
              textAlign: 'center',
              gap: { xs: '10px', md: '15px' },
              '& svg': {
                display: 'none',
              },
            },
          }}
        >
          <LayoutTitle variant='h2' icon={iconPerson}>
            <Trans id='Account' />
          </LayoutTitle>

          <AccountMenu
            sx={{
              '& .MuiButtonBase-root': {
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                borderBottom: (theme) => `1px solid ${theme.palette.custom.border} !important`,
                '& .MuiListItem-root': {
                  '& .MuiListItemIcon-root svg': {
                    stroke: (theme) => theme.palette.custom.main,
                  },
                  '& .MuiListItemText-root': {
                    '& .MuiTypography-body1': {
                      color: (theme) => theme.palette.custom.main,
                    },
                    '& .MuiTypography-body2': {
                      color: (theme) => theme.palette.custom.tertiary,
                    },
                  },
                  '& .IconSvg-root': {
                    stroke: (theme) => theme.palette.custom.wishlistColor,
                    transition: 'all 0.4s ease-in-out',
                  },
                },
                '&:hover .MuiListItem-root > .IconSvg-root.mui-style-1re38i9-IconSvg-root  ': {
                  transform: 'translateX(5px)',
                },
              },
            }}
          >
            <AccountMenuItem
              href='/account/name'
              iconSrc={iconId}
              title={<Trans id='Name' />}
              subtitle={`${customer?.firstname} ${customer?.lastname}`}
            />
            <AccountMenuItem
              href='/account/contact'
              iconSrc={iconEmailOutline}
              title={<Trans id='Contact' />}
              subtitle={customer?.email}
            />
            <AccountMenuItem
              href='/account/authentication'
              iconSrc={iconLock}
              title={<Trans id='Authentication' />}
              subtitle={<Trans id='Password' />}
            />
            <AccountMenuItem
              href='/account/orders'
              iconSrc={iconBox}
              title={<Trans id='Orders' />}
              subtitle={
                latestOrder ? (
                  <>
                    <RelativeToTimeFormat styleFormat='short'>
                      {latestOrder?.order_date}
                    </RelativeToTimeFormat>
                    {', '}
                    {latestOrder?.items && (
                      <OrderStateLabelInline
                        sx={{
                          background: (theme) =>
                            `${theme.palette.custom?.wishlistColor} !important`,
                          color: (theme) => `${theme.palette.custom.smallHeading} !important`,
                        }}
                        {...latestOrder}
                      />
                    )}
                  </>
                ) : undefined
              }
            />
            <AccountMenuItem
              href='/account/addresses'
              iconSrc={iconHome}
              title={<Trans id='Addresses' />}
              subtitle={address ? <AddressSingleLine {...address} /> : undefined}
            />
            {customer?.reviews.items.length !== 0 && (
              <AccountMenuItem
                href='/account/reviews'
                iconSrc={iconStar}
                title={<Trans id='Reviews' />}
                subtitle={
                  <Trans id='Written {0} reviews' values={{ 0: customer?.reviews.items.length }} />
                }
              />
            )}
            <AccountMenuItem
              disableRipple
              iconSrc={iconNewspaper}
              title={<Trans id='Newsletter' />}
              subtitle={<Trans id='Be the first to know about everything new!' />}
              endIcon={<CustomerNewsletterToggle color='primary' />}
              sx={(theme) => ({
                cursor: 'default',
                '& .MuiSwitch-thumb': {
                  backgroundColor: (theme: any) => theme.palette.custom.wishlistColor,
                },
                '& .MuiSwitch-switchBase': {
                  backgroundColor: (theme: any) => theme.palette.custom.borderInput,
                },
                '& .MuiSwitch-track ': {
                  backgroundColor: (theme: any) => theme.palette.custom.border,
                },
                '&:hover': { background: theme.palette.background.paper },
              })}
            />
            {import.meta.graphCommerce.magentoVersion >= 246 &&
              import.meta.graphCommerce.customerDeleteEnabled && (
                <AccountMenuItem
                  href='/account/delete'
                  disableRipple
                  iconSrc={iconBin}
                  title={<Trans id='Delete account' />}
                />
              )}

            <SignOutForm
              // eslint-disable-next-line react/no-unstable-nested-components
              button={({ formState }) => (
                <AccountMenuItem
                  iconSrc={iconShutdown}
                  loading={formState.isSubmitting}
                  type='submit'
                  title={<Trans id='Sign out' />}
                  noBorderBottom
                />
              )}
            />
          </AccountMenu>
        </Container>
      </WaitForCustomer>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}

AccountIndexPage.pageOptions = pageOptions

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const staticClient = graphqlSsrClient(context)
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
