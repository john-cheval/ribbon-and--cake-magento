import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import CartActions from './CartActions'
import CartPriceAndQuantity from './CartPriceAndQuantity'

function CartTop({ item }) {
  const configurationOptions = item?.configurable_options?.map((option) => {
    return option.value_label
  })
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Box>
        <Link href={`/p/${item?.product?.url_key}`} passHref legacyBehavior>
          <Typography
            sx={{
              color: '#000',
              fontSize: { xs: '15px', md: '16px' },
              fontWeight: 600,
              lineHeight: '120%',
              cursor: 'pointer',
            }}
          >
            {item?.product?.name}
          </Typography>
        </Link>

        {configurationOptions?.length > 0 && (
          <Box>
            {configurationOptions?.slice(0, 2)?.map((data, index, array) => (
              <Typography
                sx={{
                  color: '#000',
                  fontSize: { xs: '15px' },
                  fontWeight: 400,
                }}
                component='span'
                key={`${data}-${index}`}
              >
                {data}

                {index < array.length - 1 ? ', ' : ''}
              </Typography>
            ))}
            {configurationOptions?.length > 2 && configurationOptions[2] && (
              <Typography
                sx={{
                  color: '#000',
                  fontSize: { xs: '15px' },
                  fontWeight: 400,
                }}
                component='span'
              >
                {configurationOptions[2]}
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{ display: { xs: 'block', md: 'none' }, marginTop: '10px' }}>
          <CartPriceAndQuantity product={item} />
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <CartActions product={item} />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <CartPriceAndQuantity product={item} />
      </Box>
    </Box>
  )
}

export default CartTop
