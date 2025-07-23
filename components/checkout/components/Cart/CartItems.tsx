import { Image } from '@graphcommerce/image'
import { actionCardImageSizes } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import CartActions from './CartActions'
import CartTop from './CartTop'

export type CartItemsProps = {
  items?: any
  size?: string
}

function CartItems({ items, size = 'responsive' }: CartItemsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: { xs: '10px', md: '15px' },
        borderBottom: '1px solid #c7cacd6b',
        paddingBlock: { xs: '10px', md: '18px' },
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Image
          layout='fill'
          src={items?.product?.thumbnail?.url}
          sx={{
            width: actionCardImageSizes[size],
            height: actionCardImageSizes[size],
            display: 'block',
            borderRadius: '8px',
            objectFit: 'cover',
            marginRight: '5px',
          }}
          sizes={actionCardImageSizes[size]}
        />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <CartTop item={items} />
        <Box
          sx={{ display: { xs: 'none', md: 'block' }, marginRight: 'auto', width: 'fit-content' }}
        >
          <CartActions product={items} />
        </Box>
      </Box>
    </Box>
  )
}

export default CartItems
