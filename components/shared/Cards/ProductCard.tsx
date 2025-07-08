import { Image } from '@graphcommerce/image'
// import { AddProductsToCartFab } from '@graphcommerce/magento-product'
import { Box, Typography } from '@mui/material'
import { IoIosHeartEmpty } from 'react-icons/io'
import { IoBagHandleOutline } from 'react-icons/io5'
import dhirams from '../dhirams.svg'
import type { ProductCardProps } from '../types/cardTypes'

export function ProductCard({
  item,
  imageWidth = 356,
  imageHeight = 356,
  iconPosition = 'right',
  right = '29px',
  left = '29px',
  top = '24px',
  padding = '16px',
  // sku,
}: ProductCardProps) {
  if (!item) {
    return null
  }

  const isLeftIcon = iconPosition === 'left'
  // const ActionIcon = isLeftIcon ? IoIosHeartEmpty : IoBagHandleOutline
  // const currentIconHoverColor = isLeftIcon ? '#F1A8B6' : iconColor

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '13px',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Image
          src={item?.image}
          alt={item?.title || 'product Image'}
          width={imageWidth}
          height={imageHeight}
          sizes='100vw'
          sx={{
            borderRadius: '8px',
          }}
        />

        <Box
          component='div'
          sx={{
            position: 'absolute',
            right: isLeftIcon ? 'auto' : right,
            left: isLeftIcon ? left : 'auto',
            top,
            backgroundColor: '#fff',
            color: '#F1A8B6',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'cemter',
            columnGap: '4px',
            padding,
            borderRadius: '50%',
            width: 'fit-content',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <IoIosHeartEmpty size='18px' />
        </Box>
      </Box>

      <Box
        component='div'
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          columnGap: '15px',
          alignItems: 'center',
        }}
      >
        <Box component='div'>
          <Typography
            component='p'
            variant='p'
            style={{
              marginBottom: '6px',
            }}
          >
            {item?.title}
          </Typography>

          {item?.startPrice && item?.endPrice && (
            <Box component='div' sx={{ display: 'flex', columnGap: '3px' }}>
              <Typography
                component='p'
                variant='p'
                style={{
                  fontWeight: 800,
                  display: 'flex',
                  gap: '3px',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={dhirams}
                  alt='Dhirams'
                  width={18}
                  height={18}
                  sizes='100vw'
                  sx={{ width: '100%', maxWidth: '18px' }}
                />
                {item?.startPrice}
              </Typography>

              <span style={{ color: '#000', fontWeight: 800 }}>-</span>

              <Typography
                component='p'
                variant='p'
                style={{
                  fontWeight: 800,
                  display: 'flex',
                  gap: '3px',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={dhirams}
                  alt='Dhirams'
                  width={18}
                  height={18}
                  sizes='100vw'
                  sx={{ width: '100%', maxWidth: '18px' }}
                />
                {item?.endPrice}
              </Typography>
            </Box>
          )}

          {item?.price && (
            <Box component='div' sx={{ display: 'flex', columnGap: '3px' }}>
              <Typography
                component='p'
                variant='p'
                style={{
                  fontWeight: 800,
                  display: 'flex',
                  gap: '3px',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={dhirams}
                  alt='Dhirams'
                  width={18}
                  height={18}
                  sizes='100vw'
                  sx={{
                    width: '100%',
                    maxWidth: '18px',
                    // objectFit: 'cover',
                  }}
                />
                {item?.price}
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '4px',
            justifyContent: 'center',
            backgroundColor: '#F6DBE0',
            color: '#441E14',
            padding: '17px',
            borderRadius: '50%',
            width: 'fit-content',
            cursor: 'pointer',
            border: '1px solid #F6DBE0 ',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <IoBagHandleOutline size='18px' />
        </Box>
      </Box>
    </Box>
  )
}
