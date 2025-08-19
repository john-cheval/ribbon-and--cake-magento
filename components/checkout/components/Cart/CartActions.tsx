import { productEditLink, RemoveItemFromCart } from '@graphcommerce/magento-cart-items'
import { Box, Button } from '@mui/material'
import { CiEdit } from 'react-icons/ci'
import { iconDelete } from '../../../../plugins/icons'

function CartActions({ product, size = 'responsive' }) {
  const hasOptions = !(
    (product.__typename === 'SimpleCartItem' || product.__typename === 'VirtualCartItem') &&
    product.customizable_options.length === 0
  )
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: { xs: '5px', md: '20px' },
      }}
    >
      {/*   {hasOptions && ( * */}
      <Button
        variant='inline'
        sx={{
          color: '#9D9D9D',
          paddingTop: 0,
          paddingLeft: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        href={`${productEditLink(product)}?cartItemId=${product?.uid}`}
      >
        <CiEdit size={'20px'} />
      </Button>
      {/*  )} */}

      <RemoveItemFromCart
        removeIcon={iconDelete}
        {...product}
        buttonProps={{ size: size === 'responsive' ? 'large' : size }}
      />
    </Box>
  )
}

export default CartActions
