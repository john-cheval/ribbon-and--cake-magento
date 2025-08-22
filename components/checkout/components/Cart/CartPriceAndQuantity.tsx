import { useDisplayInclTax } from '@graphcommerce/magento-cart'
import { UpdateItemQuantity } from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import { Box } from '@mui/material'

function CartPriceAndQuantity({ product }) {
  const inclTaxes = useDisplayInclTax()

  let price: number | null | undefined

  if (inclTaxes) {
    if (product?.prices?.price_including_tax) {
      price = product?.prices.price_including_tax.value
    } else {
      const rowTotalIncludingTax = product?.prices?.row_total_including_tax?.value ?? 0
      price = rowTotalIncludingTax / product?.quantity
    }
  } else {
    price = product?.prices?.price.value
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        component='div'
        className='orderProduct'
        sx={{
          order: { xs: 1, md: 0 },
          textAlign: { xs: 'left', md: 'right' },
          ['& span']: {
            fontSize: { xs: '15px', md: '16px', lg: '20px' },
            lineHeight: '24px',
            fontWeight: '700',
            color: '#000000',

            ['&:first-child']: {
              paddingRight: '6px',
            },
          },
        }}
      >
        <Money value={price} currency={product?.prices?.price.currency} />
      </Box>
      <Box>
        <UpdateItemQuantity
          sx={{
            flexShrink: '0',
            '& .MuiOutlinedInput-root': {
              color: '#333',
              borderRadius: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F6DBE0 ',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F6DBE0 !important',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F6DBE0 !important',
            },
            '& .MuiButtonBase-root': {
              color: '#333333',
              fontsize: { xs: '15px', lg: '18px' },
              fontWeight: 500,
            },
            '& .MuiInputBase-input': {
              color: '#333333',
              fontWeight: '500',
              fontsize: { xs: '15px', lg: '18px' },
            },
            '& .MuiButtonBase-root svg': {
              fontSize: { xs: '15px', md: '18px' },
            },
          }}
          uid={product?.uid}
          quantity={product?.quantity}
        />
      </Box>
    </Box>
  )
}

export default CartPriceAndQuantity
