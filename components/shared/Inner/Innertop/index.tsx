import { Image } from '@graphcommerce/image'
import { BaseProps, CategoryDefaultFragment, ProductFiltersPro, ProductFiltersProSortSection, ProductListCount, useProductFiltersPro, useProductList } from '@graphcommerce/magento-product'
import {
  Box,
  Breadcrumbs,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import { useState } from 'react'
import rightArrow from './arrow_right.svg'
import type { ProductListLayoutProps } from '../../../ProductListLayout/types'
import { iconCloseAccordion, iconOpenAccordion } from '../../../../plugins/icons'
import { useProductFiltersProSort } from '@graphcommerce/magento-product/components/ProductFiltersPro/useProductFiltersProSort'



function capitalizeFirstLetter(str?: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}


export type InnerTopProps = ProductListLayoutProps & {
  count?: number | null
  title?: string | null
  isFilter?: boolean
  mainTitle?: string | null
  sx?: SxProps<Theme>
}


export function InnerTop(props: InnerTopProps) {
  console.log('props::::', props)
  const { count, title, isFilter, mainTitle, sx, filters, filterTypes, params, products, handleSubmit, category, menu } = props
  // const router = useRouter()
  // const routes = Array.isArray(router.query.url) ? router.query.url[0] : undefined
  // const capitalizedRoute = capitalizeFirstLetter(routes)
  const [sortValue, setSortValue] = useState('Latest')
  // console.log(title, 'this is the title')

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string)
    // Here you would typically trigger a re-fetch of products based on the new sortValue
    // router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, sort: event.target.value },
    // });
  }
  // if (!params || !products?.items || !filterTypes) return null
  // const { total_count, sort_fields, page_info } = products
  console.log('category', props)

  return (

    <Box sx={{ paddingInline: { xs: '18px', md: '25px', lg: '55px' } }}>
      <Box
        sx={[
          {
            borderTop: '1px solid #d4d4d4',
            ...((isFilter || mainTitle) && { borderBottom: '1px solid #d4d4d4' }),
            paddingBlock: '15px',
          },

          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box sx={{ marginBottom: '15px' }}>
          <Box
            aria-label='breadcrumb'
            sx={{
              display: 'flex',
              columnGap: '10px',
              alignItems: 'center',
            }}
          >
            <Typography
              component='p'
              variant='p'
              sx={{
                color: '#969696 !important',
                fontWeight: 400,
              }}
            >
              <Link href='/'>Home</Link>
            </Typography>

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
              variant='p'
              sx={{
                color: '#969696 !important',
                fontWeight: 400,
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {mainTitle && (
          <Typography component='h2' variant='h2' sx={{}}>
            {mainTitle}
          </Typography>
        )}

        {isFilter && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '40px',
              }}
            >
              <Typography component='h2' variant='h2' sx={{}}>
                {title}
              </Typography>

              <ProductListCount
                total_count={count}
                sx={{ gridArea: 'count', width: '100%', my: 0, height: '1em-' }}
              />
            </Box>

             {params && products?.items && filterTypes && <ProductFiltersPro
                params={params}
                aggregations={filters?.aggregations}
                appliedAggregations={products?.aggregations}
                filterTypes={filterTypes}
                autoSubmitMd
                handleSubmit={handleSubmit}
              >
                <ProductFiltersProSortSection
                  sort_fields={products?.sort_fields}
                  total_count={products?.total_count}
                  category={category}
                  openAccordionIcon={iconOpenAccordion}
                  closeAccordionIcon={iconCloseAccordion}
                  sx={{
                    paddingTop: (theme) => theme.spacings.xs,
                  }}
                  isDropdown={true}
                  isButton={true}
                />
              </ProductFiltersPro>}
          </Box>
        )}
      </Box>
    </Box>

  )
}
