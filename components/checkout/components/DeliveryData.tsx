import { FormAutoSubmit, SelectElement } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { SetBillingAddressDocument } from '@graphcommerce/magento-cart-shipping-address'
import { FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'

export default function DeliveryDate({ slotList }) {
  const form = useFormGqlMutationCart(SetBillingAddressDocument, {
    skipUnchanged: true,
    defaultValues: {},
  })
  const selectedDate = form.watch('region')
  const { required, error, handleSubmit } = form
  const submit = handleSubmit(() => {})

  const uniqueDates = [...new Set(slotList?.slots?.map((slot) => slot.date))] as string[]
  const sortDates = uniqueDates?.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  const deliveryDateOptions = sortDates.map((dateString) => ({
    id: dateString,
    label: dateString,
    value: dateString,
  }))

  return (
    <Box
      sx={{
        width: '100%',
        '& .mui-style-15vp5v0-FormRow-root': {
          paddingTop: '0px',
          paddingBottom: '0px',
          '& .MuiInputLabel-root': {
            color: (theme) => theme.palette.custom.main,
            fontSize: { xs: '14px', md: '16px' },
            fontWeight: '400',
            lineHeight: '158%',
          },
          '& .MuiInputLabel-root.MuiInputLabel-animated': {
            backgroundColor: 'white',
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
          label={<Trans id='Delivery Date' />}
          required={required.region}
          showValid
          options={deliveryDateOptions?.map((slot) => ({
            id: slot?.id,
            label: slot?.label,
          }))}
        />
        <SelectElement
          control={form.control}
          name='regionId'
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
          required={required.regionId}
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
