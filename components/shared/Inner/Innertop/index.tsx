import { Image } from '@graphcommerce/image'
import {
  ProductFiltersPro,
  ProductFiltersProSortSection,
  ProductListCount,
} from '@graphcommerce/magento-product'
import { Box, SelectChangeEvent, SxProps, Theme, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  iconArrowDropDown,
  iconArrowDropDownUp,
  iconCloseAccordion,
  iconOpenAccordion,
} from '../../../../plugins/icons'
import { ProductListLayoutProps } from '../../../ProductListLayout'
import rightArrow from './arrow_right.svg'

type InnerTopBaseProps = {
  count?: number | null
  title?: string | null
  mainTitle?: string | null
  sx?: SxProps<Theme>
  responsiveTitle?: string
  isShopPage?: boolean
}
type InnerTopWithFiltersProps = InnerTopBaseProps &
  ProductListLayoutProps & {
    isFilter: true
  }
type InnerTopWithoutFiltersProps = InnerTopBaseProps & {
  isFilter?: false
}
export type InnerTopProps = InnerTopWithFiltersProps | InnerTopWithoutFiltersProps

export function InnerTop(props: InnerTopProps) {
  const { count, title, isFilter, mainTitle, responsiveTitle, isShopPage = false, sx } = props
  const router = useRouter()

  const nestedRoutes = Array.isArray(router.query.url)
    ? router.query.url
    : router.query.url
      ? [router.query.url]
      : []

  return (
    <Box sx={{ paddingInline: { xs: '18px', md: '25px', lg: '55px' } }}>
      <Box
        sx={[
          {
            // borderTop: '1px solid #d4d4d4',
            borderTop: (theme) => `1px solid ${theme.palette.custom.borderSecondary}`,
            ...((isFilter || mainTitle) && {
              borderBottom: (theme) => `1px solid ${theme.palette.custom.borderSecondary}`,
            }),
            paddingBlock: { xs: '10px', lg: '15px' },
          },

          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box sx={{ marginBottom: '15px' }}>
          <Box
            aria-label='breadcrumb'
            sx={{
              display: 'flex',
              columnGap: { xs: '3px', sm: '5px', md: '10px' },
              alignItems: 'center',
              overflowX: { xs: 'auto', md: 'none' },
              whiteSpace: 'nowrap',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
            }}
          >
            <Typography
              component='p'
              sx={{
                color: (theme: any) => theme.palette.custom.tertiary,
                fontWeight: 400,
                fontSize: { xs: '15px', md: '16px' },
              }}
            >
              <Link href='/'>Home</Link>
            </Typography>

            {title && (
              <>
                <Image
                  src={rightArrow}
                  width={18}
                  height={18}
                  sizes='100vw'
                  sx={{
                    width: '18px',
                    height: 'auto',
                    verticalAlign: 'middle',
                    flexShrink: 0,
                  }}
                />

                <Typography
                  component='p'
                  sx={{
                    color: (theme: any) => theme.palette.custom.tertiary,
                    fontWeight: 400,
                    fontSize: { xs: '15px', md: '16px' },
                  }}
                >
                  {title}
                </Typography>
              </>
            )}

            {!title &&
              nestedRoutes?.length > 0 &&
              nestedRoutes.map((link, index) => {
                const formattedLink = link
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')

                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      columnGap: { xs: '3px', sm: '5px', md: '10px' },
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src={rightArrow}
                      width={18}
                      height={18}
                      sizes='100vw'
                      sx={{
                        width: '18px',
                        height: 'auto',
                        verticalAlign: 'middle',
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      component='p'
                      sx={{
                        color: (theme: any) => theme.palette.custom.tertiary,
                        fontWeight: 400,
                        fontSize: { xs: '15px', md: '16px' },
                      }}
                    >
                      {formattedLink}
                    </Typography>
                  </Box>
                )
              })}
          </Box>
        </Box>

        {mainTitle && (
          <Typography component='h2' variant='h2' sx={{}}>
            {mainTitle}
          </Typography>
        )}

        {isFilter && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'unset', md: 'space-between' },
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '40px',
                justifyContent: { xs: 'space-between', md: 'start' },
              }}
            >
              <Typography component='h2' variant='h2' sx={{}}>
                {title}
              </Typography>

              <ProductListCount
                total_count={count}
                sx={{
                  gridArea: 'count',
                  width: '100%',
                  my: 0,
                  height: '1em-',
                  textAlign: { xs: 'right', md: 'left' },
                }}
              />
            </Box>

            {!isShopPage && (
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {props.params && props.products?.items && props.filterTypes && (
                  // <ProductFiltersPro
                  //   params={props.params}
                  //   aggregations={props.filters?.aggregations}
                  //   appliedAggregations={props.products?.aggregations}
                  //   filterTypes={props.filterTypes}
                  //   autoSubmitMd
                  //   handleSubmit={props.handleSubmit}
                  // >
                  <ProductFiltersProSortSection
                    sort_fields={props.products?.sort_fields}
                    total_count={props.products?.total_count}
                    category={props.category}
                    openAccordionIcon={iconArrowDropDown}
                    closeAccordionIcon={iconArrowDropDownUp}
                    sx={{
                      borderBottom: 'none !important',
                      '& .MuiAccordionSummary-content .MuiTypography-body1': {
                        color: (theme: any) => theme.palette.custom.main,
                        fontWeight: 500,
                        fontSize: { xs: '15px', md: '16px' },
                        marginBottom: '0 !important',
                        position: 'relative',
                      },
                      '& .MuiAccordionDetails-root > div': {
                        position: 'absolute',
                        backgroundColor: '#fff',
                        width: '100%',
                        borderRadius: '4px',
                        zIndex: 1000,
                        border: (theme) => `1px solid ${theme.palette.custom.border}`,
                        '& .ActionCardLayout-root ': {
                          border: (theme) => theme.palette.custom.border,
                          borderRadius: '4px',
                          '& .MuiButtonBase-root': {
                            borderBottom: (theme) => `1px solid ${theme.palette.custom.border}`,

                            '& .ActionCard-title': {
                              fontSize: { xs: '15px', md: '16px' },
                              fontWeight: 400,
                            },
                            '& .ActionCard-end': {
                              display: 'none',
                            },
                          },
                        },
                        '& .ActionCard-root.selected': {
                          backgroundColor: (theme) => theme.palette.custom.border,
                        },
                      },
                      '& .ActionCardLayout-root ': {
                        backgroundColor: 'white',
                      },
                      '& .ActionCard-root.selected': {
                        backgroundColor: (theme) => theme.palette.custom.border,
                      },
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        position: 'relative',
                        top: '8px',
                        marginLeft: '15px',
                      },
                    }}
                    // isDropdown={true}
                    // isButton={true}
                  />
                  // </ProductFiltersPro>
                )}
              </Box>
            )}
          </Box>
        )}

        {responsiveTitle && (
          <Typography
            component='h2'
            variant='h2'
            sx={{
              display: { xs: 'block', lg: 'none' },
              borderBottom: {
                xs: (theme) => `1px solid ${theme.palette.custom.borderSecondary}`,
                lg: 'none',
              },
              marginBottom: { xs: '0', md: '15px', lg: '0' },
              paddingBottom: { xs: '0', md: '15px', lg: '0' },
            }}
          >
            {responsiveTitle}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
