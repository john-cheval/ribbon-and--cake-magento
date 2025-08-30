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
  isFilters?: boolean
  menu?: any
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
  const {
    count,
    title,
    isFilter,
    mainTitle,
    responsiveTitle,
    isShopPage = false,
    sx,
    isFilters = false,
    menu,
  } = props
  const router = useRouter()

  // const nestedRoutes = Array.isArray(router.query.url)
  //   ? router.query.url
  //   : router.query.url
  //     ? [router.query.url]
  //     : []

  const nestedRoutess = router?.asPath?.split('/').filter(Boolean)

  return (
    <Box sx={{ paddingInline: { xs: '18px', md: '25px', lg: '55px' } }}>
      <Box
        sx={[
          (theme) => ({
            borderTop: `1px solid ${theme.palette.custom.borderSecondary}`,
            paddingBlock: { xs: '10px', lg: '15px' },

            ...((isFilter || mainTitle || isFilters) && {
              borderBottom: {
                xs:
                  mainTitle || isFilters
                    ? `1px solid ${theme.palette.custom.borderSecondary}` // show if mainTitle=true
                    : 0, // hide if only isFilter=true
              },
              [theme.breakpoints.up('md')]: {
                borderBottom: `1px solid ${theme.palette.custom.borderSecondary}`, // always show on md+
              },
            }),
          }),

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
              nestedRoutess?.length > 0 &&
              nestedRoutess.map((link, index) => {
                const formattedLink = link
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')

                const linkPath = `/courses`

                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      columnGap: { xs: '3px', sm: '5px', md: '10px' },
                      alignItems: 'center',
                    }}
                  >
                    {index !== 0 && (
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
                    )}

                    {index === 0 ? null : index === 1 ? (
                      <Link href={linkPath} passHref>
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
                      </Link>
                    ) : (
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
                    )}
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

        {/*isFilters && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '40px',
              justifyContent: { xs: 'space-between', md: 'start' },
              width: { xs: '100%', md: 'fit-content' },
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
        )*/}

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
                columnGap: { xs: '20px', sm: '30px', md: '40px' },
                justifyContent: { xs: 'space-between', md: 'start' },
                width: { xs: '100%', md: 'fit-content' },
              }}
            >
              <Typography
                component='h2'
                variant='h2'
                sx={{
                  whiteSpace: 'nowrap',
                  // overflow: 'hidden',
                  //  textOverflow: 'ellipsis',
                }}
              >
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
                    menu={menu}
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
                        minWidth: '200px',
                        border: (theme) => `1px solid ${theme.palette.custom.border}`,
                        '& .ActionCard-root': {
                          borderRadius: '0',
                        },
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
                        marginLeft: '5px',
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
