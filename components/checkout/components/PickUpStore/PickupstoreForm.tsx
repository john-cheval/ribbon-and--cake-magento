import { EmailElement, RadioButtonGroup, TelephoneElement } from '@graphcommerce/ecommerce-ui'
import { EmailForm } from '@graphcommerce/magento-cart-email'
import { NameFields } from '@graphcommerce/magento-customer'
import { Form, FormRow } from '@graphcommerce/next-ui'
import { FormAutoSubmit, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { useApolloClient } from '@apollo/client'
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { CreateStorePickupDocument } from '../../../../graphql/CreatePickupStore.gql'

const useFormGqlMutationStorePickup = (document, options, operationOptions, storeData) => {
  const client = useApolloClient()
  const form = useForm({
    defaultValues: options.defaultValues || {},
    mode: options.mode || 'onBlur',
  })

  const result = useFormGqlMutation(
    document,
    {
      ...options,
      onBeforeSubmit: async (variables) => {
        const selectedLocationId = variables.selectedLocation
        const locationData = storeData.find((loc) => loc.name.toString() === selectedLocationId)

        const vars = {
          ...variables,
          address: locationData?.address,
          city: locationData?.city,
          storename: locationData?.storename,
          telephone: locationData?.telephone,
          // Add any other fields you need to send to the backend
        }
        // const vars = { ...variables }
        console.log(vars, options, '==>variables')

        return options.onBeforeSubmit ? options.onBeforeSubmit(vars) : vars
      },
    },
    { errorPolicy: 'all', ...operationOptions },
  )

  return { ...result, ...form }
}

function PickupStoreForm({ storeData }) {
  console.log(storeData, '==>prickupstoreData')

  const form = useFormGqlMutationStorePickup(
    CreateStorePickupDocument,
    {
      onBeforeSubmit: (variables) => {
        // return {
        //   ...variables,
        //   address: variables.firstname,
        //   city: variables.lastname,
        // }

        return variables
      },
      defaultValues: {
        // selectedLocation: storeData?.[0]?.name.toString() || '', // Set a default value
        selectedLocation: storeData?.[0]?.name.toString() || '', // Set a default value
      },
    },
    {},
    storeData,
  )

  const {
    handleSubmit,
    error,
    required,
    control,
    formState: { errors },
  } = form
  const submit = handleSubmit(() => {})

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
        name={['firstname', 'lastname', 'telephone']}
      />

      <Box sx={{ marginTop: '15px' }}>
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
        <NameFields form={form} />
        <FormRow
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <EmailElement
            control={control}
            name='email'
            variant='outlined'
            required={required.email}
            showValid
          />
          <TelephoneElement
            control={control}
            name='telephone'
            variant='outlined'
            required={required.telephone}
            showValid
          />
        </FormRow>
      </Box>

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

        {/*storeData?.length > 0 && (
          <Box sx={{ marginTop: { xs: '10px', md: '15px', lg: '20px' } }}>
            <RadioGroup
              aria-labelledby='Locations'
              name='Location-buttons-group'
              sx={{ display: 'flex', gap: '10px', flexDirection: { xs: 'column', md: 'row' } }}
            >
              {storeData?.map((location, index) => {
                return (
                  <FormControlLabel
                    sx={{
                      '& .MuiRadio-root': {
                        visibility: 'hidden',
                        height: 0,
                        background: 'transparent',
                        color: 'transparent',
                        width: '10px',
                        padding: 0,
                      },
                      '&  .MuiRadio-root.Mui-checked + .MuiFormControlLabel-label': {
                        backgroundColor: (theme) => theme.palette.custom.border,
                      },
                    }}
                    value='female'
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          border: (theme) => `1px solid ${theme.palette.custom.wishlistColor}`,
                          borderRadius: '4px',
                          padding: '28px  30px',
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
                          {location?.storename}
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
                          {location?.address} - {location?.city}
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
                          {location?.telephone}
                        </Typography>
                      </Box>
                    }
                  />
                )
              })}
            </RadioGroup>
          </Box>
        )*/}

        {storeData?.length > 0 && (
          <Box sx={{ marginTop: { xs: '10px', md: '15px', lg: '20px' } }}>
            {/* WRAP RadioGroup in Controller */}
            <Controller
              name='selectedLocation'
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
                          '&  .MuiRadio-root.Mui-checked + .MuiFormControlLabel-label .MuiBox-root':
                            {
                              backgroundColor: (theme) => theme.palette.custom.border,
                            },
                        }}
                        // PASS THE UNIQUE ID AS THE VALUE
                        value={location.name.toString()}
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
