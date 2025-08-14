import { Image } from '@graphcommerce/image'
import { actionCardImageSizes } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import CartActions from './CartActions'
import CartTop from './CartTop'

export type CartItemsProps = {
  items?: any
  size?: string
  length?: number | undefined
  index?: number
}

function CartItems({ items, size = 'responsive', length, index }: CartItemsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: { xs: '10px', md: '15px' },
        borderBottom: {
          xs: index !== (length ?? 0) - 1 ? '1px solid #c7cacd6b' : 'none',
          md: '1px solid #c7cacd6b',
        },
        paddingBlock: { xs: '10px', md: '18px' },
        width: '100%',
      }}
    >
      <Box sx={{ flexShrink: 0, width: 'fit-content' }}>
        <Image
          layout='fill'
          src={items?.product?.thumbnail?.url}
          sx={{
            // width: actionCardImageSizes[size],
            // height: actionCardImageSizes[size],
            // height: '100%',
            // width: '100%',
            display: 'block',
            borderRadius: '8px',
            objectFit: 'cover',
            marginRight: '10px',
            minWidth: '100px',
            maxHeight: '100px',
            maxWidth: '120px',
          }}
          sizes={actionCardImageSizes[size]}
        />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0, marginLeft: '10px' }}>
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
