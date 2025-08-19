import { Form } from '@graphcommerce/next-ui'
import { FormAutoSubmit } from '@graphcommerce/react-hook-form'
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { SetPickupLocationOnCartDocument } from '../../../../graphql/CreatePickupStore.gql'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { GetShippingMethodsDocument } from '@graphcommerce/magento-cart-shipping-method/components/ShippingMethodForm/GetShippingMethods.gql'

function PickupStoreForm({ storeData }) {
  const availableMethods = useCartQuery(GetShippingMethodsDocument, { fetchPolicy: 'cache-only' })

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
        }
      }
    },
  })

  const { control, required, handleSubmit } = form
  const submit = handleSubmit(() => { })

  return (
    <Form
      onSubmit={submit}
      noValidate
      sx={{
        '& .MuiInputLabel-formControl': {
          color: (theme) => theme.palette.custom.main,
          fontSize: { xs: '14px', md: '16px' },
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

      {/* <Box sx={{ marginTop: '15px' }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.custom.dark,
            fontSize: { xs: '16px', md: '20px' },
            //marginTop: '15px',
            //  marginBottom: { xs: '10px', md: '15px' },
            textTransform: 'capitalize',
            fontWeight: 400,
            fontVariationSettings: '"wght" 400',
          }}
        >
          Your Details
        </Typography>
        <FormRow>
          <TextFieldElement
            control={control}
            name='pickupLocationAddress.firstname'
            required={required.pickupLocationAddress}
            variant='outlined'
            type='text'
            label={<Trans id='First Name' />}
            showValid
          />
          <TextFieldElement
            control={control}
            name='pickupLocationAddress.lastname'
            required={required.pickupLocationAddress}
            variant='outlined'
            type='text'
            label={<Trans id='Last Name' />}
            showValid
          />
        </FormRow>
        <FormRow
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <EmailElement
            control={control}
            name=''
            variant='outlined'
            showValid
          />
          <TelephoneElement
            control={control}
            name='pickupLocationAddress.telephone'
            variant='outlined'
            showValid
            required={required.pickupLocationAddress}
          />
        </FormRow>
      </Box> */}

      <Box
        sx={{
          marginTop: { Xs: '15px', md: '20px', lg: '30px' },
        }}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.custom.dark,
            fontSize: { xs: '16px', md: '20px' },
            //marginTop: '15px',
            //  marginBottom: { xs: '10px', md: '15px' },
            textTransform: 'capitalize',
            fontWeight: 400,
            fontVariationSettings: '"wght" 400',
          }}
        >
          Choose Location
        </Typography>

        {storeData?.length > 0 && (
          <Box sx={{ marginTop: { xs: '10px', md: '15px', lg: '20px' } }}>
            {/* WRAP RadioGroup in Controller */}
            <Controller
              name='pickupLocationCode'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  aria-labelledby='Locations'
                  sx={{ display: 'flex', gap: '10px', flexDirection: { xs: 'column', md: 'row' } }}
                >
                  {storeData?.map((location, index) => {
                    return (
                      <FormControlLabel
                        key={location.name}
                        sx={{
                          '& .MuiRadio-root': {
                            visibility: 'hidden',
                            height: 0,
                            background: 'transparent',
                            color: 'transparent',
                            width: '10px',
                            padding: 0,
                          },
                          // Reverted to a working selector for the background change
                          '&  .MuiRadio-root.Mui-checked + .MuiStack-root .MuiFormControlLabel-label .MuiBox-root':
                          {
                            backgroundColor: (theme) => theme.palette.custom.border,
                          },
                          '& .MuiFormControlLabel-asterisk': {
                            display: "none"
                          }
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
                              // Conditional styling for the box
                              // backgroundColor: (theme) => field.value === location.name.toString() ? theme.palette.custom.border : 'inherit',
                            }}
                          >
                            <Typography
                              component='p'
                              sx={{
                                fontSize: { xs: '14px', sm: '16px', md: '20px' },
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
                                fontSize: { xs: '12px', sm: '14px', md: '16px' },
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
                                fontSize: { xs: '12px', sm: '14px', md: '16px' },
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
