import { Box, Typography } from '@mui/material'
import CartActions from './CartActions'
import CartPriceAndQuantity from './CartPriceAndQuantity'

function CartTop({ item }) {
  const configurationOptions = item?.configurable_options?.map((option) => {
    return option.value_label
  })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Box>
        <Typography
          sx={{
            color: '#000',
            fontSize: { xs: '14px', md: '16px' },
            fontWeight: 600,
            lineHeight: '120%',
          }}
        >
          {item?.product?.name}
        </Typography>

        {configurationOptions?.length > 0 && (
          <Typography
            sx={{
              color: '#000',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              fontWeight: 400,
            }}
          >
            With{' '}
            {configurationOptions[0].charAt(0).toUpperCase() + configurationOptions[0].slice(1)},{' '}
            {configurationOptions[1] && configurationOptions[1].toUpperCase()}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <CartActions product={item} />
      </Box>
      <Box>
        <CartPriceAndQuantity product={item} />
      </Box>
    </Box>
  )
}

export default CartTop
