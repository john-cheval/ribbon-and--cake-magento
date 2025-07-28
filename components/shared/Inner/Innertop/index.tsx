import { Image } from '@graphcommerce/image'
import { ProductListCount } from '@graphcommerce/magento-product'
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
import CustomSelectInput from '../../Inputs/CustomSelectInput'
import rightArrow from './arrow_right.svg'

function capitalizeFirstLetter(str?: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export interface InnerTopProps {
  count?: number | null
  title?: string | null
  isFilter?: boolean
  mainTitle?: string | null
  sx?: SxProps<Theme>
}

export function InnerTop(props: InnerTopProps) {
  const { count, title, isFilter, mainTitle, sx } = props
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

            <Box>
              <Typography
                variant='p'
                sx={{
                  color: '#441E14 !important',
                  fontWeight: 500,
                }}
              >
                Sort by :{' '}
              </Typography>

              <FormControl variant='standard' sx={{ m: 0, minWidth: 120 }}>
                {' '}
                <Select
                  value={sortValue}
                  onChange={handleSortChange}
                  displayEmpty
                  input={<CustomSelectInput />}
                  inputProps={{ 'aria-label': 'Sort by' }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#F6DBE0',
                        '& .MuiMenuItem-root': {
                          // padding: 2,
                          color: '#441E14',
                          fontFamily: '"Bricolage Grotesque", sans-serif',
                          fontSize: { xs: '14px', md: '16px' },
                          fontWeight: 500,
                          lineHeight: '158%',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value='Latest'>Latest</MenuItem>
                  <MenuItem value='Price_ASC'>Price: Low to High</MenuItem>
                  <MenuItem value='Price_DESC'>Price: High to Low</MenuItem>
                  <MenuItem value='Name_ASC'>Name: A-Z</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
