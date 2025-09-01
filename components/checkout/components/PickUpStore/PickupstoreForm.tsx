import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { GetShippingMethodsDocument } from '@graphcommerce/magento-cart-shipping-method/components/ShippingMethodForm/GetShippingMethods.gql'
import { Form } from '@graphcommerce/next-ui'
import { FormAutoSubmit } from '@graphcommerce/react-hook-form'
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { SetPickupLocationOnCartDocument } from '../../../../graphql/CreatePickupStore.gql'
import { useEffect } from 'react'
import { ShippingMethodFormDocument } from '@graphcommerce/magento-cart-shipping-method'

function PickupStoreForm({ storeData }) {
  const availableMethods = useCartQuery(GetShippingMethodsDocument, { fetchPolicy: 'cache-and-network' })

  const shippingAddress = availableMethods.data?.cart?.shipping_addresses?.[0]

  const billingAddress = availableMethods.data?.cart?.billing_address

  const form = useFormGqlMutationCart(SetPickupLocationOnCartDocument, {
    mode: 'onChange',
    onBeforeSubmit: (variables: any) => {
      return {
        ...variables,
        pickupLocationAddress: {
          firstname: shippingAddress?.firstname ?? billingAddress?.firstname ?? '',
          lastname: shippingAddress?.lastname ?? billingAddress?.lastname ?? '',
          city: '_',
          country_code: shippingAddress?.country?.code ?? billingAddress?.country?.code ?? '',
          street: ['_'],
          telephone: shippingAddress?.telephone ?? billingAddress?.telephone ?? '_',
          postcode: '_',
          region: shippingAddress?.region?.code ?? billingAddress?.region?.code ?? '_',
        },
      }
    },
  })

  const { data, control, required, handleSubmit } = form
  const submit = handleSubmit(() => { })

  const method_form = useFormGqlMutationCart(ShippingMethodFormDocument, {
    onBeforeSubmit: (variables: any) => {
      const [carrier, method] = (variables?.carrierMethod ?? '').split('-')

      return { ...variables, carrier, method: "pickup" }
    }
  })

  const { handleSubmit: handleSubmitMethod, setValue } = method_form
  const methodSubmit = handleSubmitMethod(() => { })

  const setShippingMethod = (code, method) => {
    setValue(code, method, { shouldValidate: true })
    methodSubmit()
  }

  useEffect(() => {
    if (data?.setShippingAddressesOnCart?.cart && form?.formState?.isSubmitSuccessful && !form?.formState?.isSubmitting && form?.formState?.isSubmitted) {
      const shippingAddress = data?.setShippingAddressesOnCart?.cart?.shipping_addresses?.[0]
      const availableMethods = (shippingAddress?.available_shipping_methods ?? [])

      let selectedMethod

      if (availableMethods?.length) {
        selectedMethod = availableMethods?.find(
          (m: any) => (m?.carrier_code === 'instore' && m?.method_code === 'pickup') || (m?.carrier_code === "cityrate" && m?.method_code === "cityrate") || availableMethods?.[0],
        )

        if (selectedMethod) {
          setShippingMethod("carrierMethod", selectedMethod?.carrier_code)
        }
      }
    }
  }, [form?.formState?.isSubmitSuccessful, form?.formState?.isSubmitting, form?.formState?.isSubmitted])

  return (
    <Form
      onSubmit={submit}
      noValidate
      sx={{
        paddingTop: 0,
        '& .MuiInputLabel-formControl': {
          color: (theme) => theme.palette.custom.main,
          fontSize: { xs: '15px', md: '16px' },
          lineHeight: '158%',
          fontWeight: 400,

          '&.Mui-focused': {
            color: (theme) => theme.palette.custom.main,
          },
          '& .MuiFormLabel-asterisk': {
            display: 'none',
          },
        },

        '& .MuiOutlinedInput-root': {
          border: (theme) => `1px solid ${theme.palette.custom.border}`,
          borderRadius: '4px',

          '&:hover': {
            border: (theme) => `1px solid ${theme.palette.custom.main}`,
          },
          '&.Mui-focused': {
            border: (theme) => `1px solid ${theme.palette.custom.main}`,
          },
          '& [data-shrink="true"]': {
            backgroundColor: 'red',
          },

          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
      }}
    >
      <FormAutoSubmit
        submit={submit}
        control={control}
        // name={['pickupLocationAddress.firstname', 'pickupLocationAddress.lastname', 'pickupLocationAddress.telephone', 'pickupLocationCode']}
        name={['pickupLocationCode']}
      />

      <Box>
        <Typography
          sx={{
            color: (theme) => theme.palette.custom.dark,
            fontSize: { xs: '16px', md: '20px' },
            textTransform: 'capitalize',
            fontWeight: 400,
            fontVariationSettings: '"wght" 400',
          }}
        >
          Choose Location
        </Typography>

        {storeData?.length > 0 && (
          <Box sx={{ marginTop: { xs: '10px', md: '15px' } }}>
            {/* WRAP RadioGroup in Controller */}
            <Controller
              name='pickupLocationCode'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  aria-labelledby='Locations'
                  sx={{
                    display: 'flex',
                    gap: '11px',
                    flexDirection: 'row',
                  }}
                >
                  {storeData?.map((location, index) => {
                    return (
                      <FormControlLabel
                        key={location.name}
                        sx={{
                          display: 'inline-block',
                          height: '100%',
                          // marginRight: '10px',
                          marginLeft: 0,
                          marginRight: 0,
                          verticalAlign: 'top',
                          width: { xs: '100%', sm: '49%' },

                          // width: 'calc(33.35% - 8px)',
                          '& .MuiRadio-root': {
                            visibility: 'hidden',
                            height: 0,
                            background: 'transparent',
                            color: 'transparent',

                            padding: 0,
                            width: 0,
                            opacity: 0,
                            position: 'absolute',
                          },
                          // Reverted to a working selector for the background change
                          '&  .MuiRadio-root.Mui-checked + .MuiStack-root .MuiFormControlLabel-label .MuiBox-root':
                          {
                            backgroundColor: (theme) => theme.palette.custom.border,
                          },
                          '& .MuiFormControlLabel-asterisk': {
                            display: 'none',
                          },
                        }}
                        required={required.pickupLocationCode}
                        // PASS THE UNIQUE ID AS THE VALUE
                        value={location?.pickup_location_code}
                        control={<Radio />}
                        label={
                          <Box
                            sx={{
                              border: (theme) => `1px solid ${theme.palette.custom.wishlistColor}`,
                              borderRadius: '4px',
                              padding: '28px  30px',
                              minWidth: '300px',
                            }}
                          >
                            <Typography
                              component='p'
                              sx={{
                                fontSize: { xs: '15px', sm: '16px', md: '20px' },
                                color: (theme) => theme.palette.custom.main,
                                fontWeight: 700,
                                lineHeight: '33px',
                              }}
                            >
                              {location?.name}
                            </Typography>
                            <Typography
                              sx={{
                                maxWidth: { xs: '100%', md: '300px' },
                                color: (theme) => theme.palette.custom.main,
                                lineHeight: '33px',
                                fontWeight: 400,
                                fontSize: { xs: '15px', md: '16px' },
                              }}
                            >
                              {location?.street} - {location?.city}
                            </Typography>
                            <Typography
                              sx={{
                                maxWidth: '250px',
                                color: (theme) => theme.palette.custom.main,
                                lineHeight: '33px',
                                fontWeight: 400,
                                fontSize: { xs: '15px', md: '16px' },
                              }}
                            >
                              {location?.phone}
                            </Typography>
                          </Box>
                        }
                      />
                    )
                  })}
                </RadioGroup>
              )}
            />
          </Box>
        )}
      </Box>
    </Form>
  )
}

export default PickupStoreForm
