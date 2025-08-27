import { SelectElement } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { SetBillingAddressDocument } from '@graphcommerce/magento-cart-shipping-address'
import { FormRow } from '@graphcommerce/next-ui'
import { FormAutoSubmit } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import dayjs from 'dayjs'

function DeliveryTime({ slotList }) {
  const form = useFormGqlMutationCart(SetBillingAddressDocument, {
    skipUnchanged: true,
    defaultValues: {},
  })
  const date = form.watch('region')
  const { required, error, handleSubmit } = form
  const submit = handleSubmit(() => { })

  const uniqueDates = [...new Set(slotList?.slots?.map((slot) => slot.date))] as string[]
  return (
    <Box
      sx={{
        width: '100%',
        '& .mui-style-15vp5v0-FormRow-root': {
          paddingTop: '0px',
          paddingBottom: '0px',
          '& .MuiInputLabel-root': {
            color: (theme) => theme.palette.custom.main,
            fontSize: { xs: '15px', md: '16px' },
            fontWeight: '400',
            lineHeight: '158%',
          },
          '& .MuiInputLabel-root.MuiInputLabel-animated': {
            padding: '0 6px',
          },
          '& .MuiOutlinedInput-root .MuiSelect-icon': {
            color: (theme: any) => theme.palette.custom.wishlistColor,
          },
          '& .MuiOutlinedInput-root .InputCheckmark': {
            display: 'none',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: (theme) => `1px solid ${theme.palette.custom.border}`,
          },
          '& .MuiSelect-select': {
            color: (theme) => theme.palette.custom.main,
          },
        },
      }}
      component='form'
      noValidate
      onSubmit={submit}
    >
      <FormAutoSubmit control={form.control} submit={submit} />
      <FormRow>
        <SelectElement
          control={form.control}
          name='region'
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: (theme) => theme.palette.custom.border,
                  color: (theme) => theme.palette.custom.main,
                  '&::-webkit-scrollbar': {
                    width: '6px',
                    borderRadius: 0,
                    backgroundColor: '#ebebeb',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#ebebeb', // fixed typo: baxkgroundColor → backgroundColor
                    borderRadius: '0px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (theme) => theme.palette.custom.main,
                    borderRadius: '0px',
                  },
                  '& .MuiMenuItem-root': {
                    color: (theme) => theme.palette.custom.main,
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.custom.wishlistColor,
                    },
                    '&.Mui-selected': {
                      backgroundColor: (theme) => theme.palette.custom.wishlistColor,
                    },
                  },
                },
              },
            },
          }}
          // autoWidth
          variant='outlined'
          label={<Trans id='Delivery Time' />}
          required={required.region}
          showValid
          options={slotList?.slots?.map((slot) => ({
            id: slot.slot_id,
            label: slot.slot,
          }))}
        />
      </FormRow>
    </Box>
  )
}

export default DeliveryTime
