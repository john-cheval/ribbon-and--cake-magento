import { Box, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { ProductCard } from '../../shared/Cards/ProductCard'

function HomeProductListMobile({ data, link = '/', initial = '', count = 4, isCategory = true }) {
  const categories = [...new Set(data?.map((tab) => tab?.category).filter(Boolean))]
  const [selectedCategory, setSelectedCategory] = useState(categories?.[0] || initial)
  const [showAll, setShowAll] = useState(false)

  const filteredData = isCategory ? data.filter((item) => item.category === selectedCategory) : data

  const itemsToRender = showAll ? filteredData : filteredData.slice(0, count)

  if (!filteredData || filteredData.length === 0) {
    return null
  }

  const isMobile = useMediaQuery('(max-width:500px)')
  return (
    <Box>
      {/* Prodct Cards Categories */}
      {isCategory && (
        <Box
          component='div'
          sx={{
            display: 'flex',
            columnGap: '5px',
            alignItems: 'center',
            overflowX: 'auto',
            whiteSpace: 'nowrap',

            '&::-webkit-scrollbar': {
              display: 'none',
            },

            scrollbarWidth: 'none',

            '-ms-overflow-style': 'none',

            paddingBottom: '5px',
            marginTop: '10px',
          }}
        >
          {categories?.map((category, index) => (
            <Box
              component='span'
              key={index}
              onClick={() => setSelectedCategory(category as string)}
              sx={{
                backgroundColor:
                  selectedCategory === category
                    ? (theme: any) => theme.palette.custom.border
                    : 'transparent',
                fontWeight: 400,
                // color: '#969696',
                color:
                  selectedCategory === category
                    ? (theme: any) => theme.palette.custom.main
                    : (theme: any) => theme.palette.custom.tertiary,
                borderRadius: selectedCategory === category ? '999px' : 'none',
                cursor: 'pointer',
                padding: { xs: '6px 15px', md: '10px 20px' },
                transition: 'all 0.3s ease',
                border: '1px solid #fff',
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
                '&:hover': {
                  border: '1px solid #F6DBE0',
                  borderRadius: '999px',
                  color: (theme: any) => theme.palette.custom.main,
                },
              }}
            >
              {String(category)}
            </Box>
          ))}
        </Box>
      )}
      {/* Prodct Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
          columnGap: '13px',
          rowGap: '16px',
          marginTop: { xs: '10px', sm: '15px' },
        }}
      >
        {itemsToRender?.map((item, index) => (
          <ProductCard
            item={item}
            iconPosition='left'
            padding='14px'
            left='25px'
            key={item?.id || index}
          />
        ))}
      </Box>
      {filteredData.length > count && (
        <Box textAlign='center' mt={2}>
          <Typography
            onClick={() => setShowAll(!showAll)}
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: (theme: any) => theme.palette.custom.main,
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': {
                color: (theme: any) => theme.palette.custom.main,
                background: 'transparent',
              },
            }}
          >
            {showAll ? 'Show Less' : 'View All'}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
export default HomeProductListMobile
