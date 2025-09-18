import { MessageSnackbar } from '@graphcommerce/next-ui'
import { useMutation, useQuery } from '@apollo/client'
import { Trans } from '@lingui/react'
import { Box, Button, CircularProgress, OutlinedInput, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AlekseonFormDocument } from '../../../graphql/aleskonForm.gql'
import { UpdateAlekseonFormDocument } from '../../../graphql/UpdateAleskonForm.gql'
import ReCaptcha from '../../../utils/ReCaptcha'

interface RecaptchaRefType {
  resetCaptcha: () => void
}

const inputFieldSx: SxProps<Theme> = {
  borderRadius: '4px',
  color: (theme: any) => theme.palette.custom.main,
  height: 'fit-content',

  '& .MuiOutlinedInput-input, & .MuiOutlinedInput-input::placeholder': {
    fontFamily: '"Bricolage Grotesque"',
    fontSize: { xs: '15px', md: '16px' },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '158%',
    color: 'inherit',
  },
  '& .MuiOutlinedInput-input::placeholder': {
    fontFamily: '"Bricolage Grotesque"',
    fontSize: { xs: '15px', md: '16px' },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '158%',
    color: (theme: any) => theme.palette.custom.main,
    opacity: 1,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme: any) => theme.palette.custom.borderInput,
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme: any) => theme.palette.custom.borderInput,
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme: any) => theme.palette.custom.borderInput,
    borderWidth: '1px !important',
  },
  '& .mui-style-y9718c-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
  {
    borderColor: (theme: any) => `${theme.palette.custom.borderInput} !important`,
  },
}

function ContactEnquiryForm() {
  const recaptchaRef = useRef<RecaptchaRefType>(null)
  const [token, setToken] = useState('')

  const [updateAlekseonForm, { data, loading: isSubmitting, error }] = useMutation(
    UpdateAlekseonFormDocument,
  )

  const {
    data: formData,
    loading: formLoading,
    error: formError,
  } = useQuery(AlekseonFormDocument, {
    variables: {
      identifier: 'contact-us',
    },
  })

  const formFields = formData?.AlekseonForm?.Forms?.[0]?.formfield || []

  // Create proper default values - always return the structure
  const getDefaultValues = () => {
    if (formLoading || !formFields.length) {
      // Return empty object while loading, will be updated later
      return {}
    }

    return formFields.reduce(
      (acc, field) => {
        if (field?.attribute_code) {
          acc[field.attribute_code] = ''
        }
        return acc
      },
      {} as Record<string, string>,
    )
  }

  const { control, handleSubmit, reset } = useForm({
    defaultValues: getDefaultValues(),
  })

  // Update form when formFields are loaded
  useEffect(() => {
    if (!formLoading && formFields.length > 0) {
      const newDefaultValues = formFields.reduce(
        (acc, field) => {
          if (field?.attribute_code) {
            acc[field.attribute_code] = ''
          }
          return acc
        },
        {} as Record<string, string>,
      )
      // Reset form with proper default values
      reset(newDefaultValues)
    }
  }, [formLoading, formFields, reset])

  const isSuccess = data?.updateAlekseonForm?.success

  useEffect(() => {
    if (isSuccess) {
      console.log('Resetting form after success')

      // Create fresh empty values for all fields
      const emptyValues = formFields.reduce(
        (acc, field) => {
          if (field?.attribute_code) {
            acc[field.attribute_code] = ''
          }
          return acc
        },
        {} as Record<string, string>,
      )

      // Reset form with empty values
      reset(emptyValues)
      setToken('')

      if (recaptchaRef.current) {
        recaptchaRef.current.resetCaptcha()
      }
    }
  }, [isSuccess, reset, formFields])

  useEffect(() => {
    if (data) {
      console.log('Mutation succeeded. Response data:', data)
    }
    if (error) {
      console.error('Mutation failed. Error details:', error)
    }
  }, [data, error])

  const onSubmit = async (values: Record<string, string>) => {
    if (!token) {
      console.error('Please verify the captcha')
      return
    }
    try {
      const fields = formFields
        ?.filter((field) => typeof field?.attribute_code === 'string')
        .map((field) => ({
          fieldIdentifier: field!.attribute_code as string,
          value: values[field!.attribute_code as string] || '',
        }))

      await updateAlekseonForm({
        variables: {
          input: {
            identifier: 'contact-us',
            fields,
          },
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleToken = (recaptchaToken: string | null) => {
    if (recaptchaToken) {
      setToken(recaptchaToken)
    } else {
      setToken('')
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: '#F6F6F6',
        borderRadius: '8px',
        padding: { xs: '26px 14px', md: '35px 38px 40px' },
      }}
    >
      <Typography variant='h2' component='h3' sx={{ textTransform: 'uppercase' }}>
        Enquire Now
      </Typography>

      <Box
        sx={{
          marginTop: { xs: '10px', md: '30px' },
          display: 'flex',
          rowGap: '11px',
          flexDirection: 'column',
        }}
      >
        <Controller
          name={formFields.find((f) => f?.frontend_label === 'Your Name')?.attribute_code || ''}
          control={control}
          rules={{ required: 'Name is Required' }}
          render={({ field, fieldState }) => (
            <>
              <TextField {...field} fullWidth label='Your Name' sx={inputFieldSx} />
              {fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          name={formFields.find((f) => f?.frontend_label === 'Your Email')?.attribute_code || ''}
          control={control}
          rules={{
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <TextField {...field} fullWidth label='Email' sx={inputFieldSx} />
              {fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          name={formFields.find((f) => f?.frontend_label === 'Your Phone')?.attribute_code || ''}
          control={control}
          rules={{
            required: 'Phone Number is Required',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Only numbers are allowed',
            },
            minLength: {
              value: 7,
              message: 'Phone number is too short',
            },
            maxLength: {
              value: 15,
              message: 'Phone number is too long',
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <TextField
                {...field}
                fullWidth
                label='Phone Number'
                sx={inputFieldSx}
                onChange={(e) => {
                  field.onChange(e.target.value.replace(/\D/g, ''))
                }}
              />
              {fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          name={formFields.find((f) => f?.frontend_label === 'Subject')?.attribute_code || ''}
          control={control}
          rules={{ required: 'Subject is Required' }}
          render={({ field, fieldState }) => (
            <>
              <TextField {...field} fullWidth label='Subject' sx={inputFieldSx} />
              {fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Box>
          <Controller
            name={formFields.find((f) => f?.frontend_label === 'Message')?.attribute_code || ''}
            control={control}
            render={({ field }) => (
              <TextField
                id='custom-textarea'
                label='Message'
                multiline
                rows={5}
                {...field}
                fullWidth
                variant='outlined'
                sx={{
                  color: (theme: any) => theme.palette.custom.main,
                  fontSize: { xs: '15px', md: '16px' },
                  borderRadius: '4px',
                  '& .MuiOutlinedInput-root': {
                    color: (theme: any) => theme.palette.custom.main,

                    '& fieldset': {
                      borderColor: (theme: any) => theme.palette.custom.borderInput,
                      '& legend': {
                        color: (theme: any) => theme.palette.custom.main,
                      },
                    },
                    '&:hover fieldset': {
                      borderColor: (theme: any) => theme.palette.custom.borderInput,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme: any) => theme.palette.custom.borderInput,
                      borderWidth: '1px !important',
                    },
                    '& textarea': {
                      padding: '10px',
                      fontFamily: '"Bricolage Grotesque"',
                    },
                  },
                  '& .mui-style-17dy96o-MuiFormLabel-root-MuiInputLabel-root ': {
                    color: (theme: any) => theme.palette.custom.main,
                  },
                  '& .MuiFormLabel-root': {
                    color: (theme: any) => theme.palette.custom.main,
                  },
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ marginTop: '10px' }}>
          <ReCaptcha
            siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            callback={handleToken}
            ref={recaptchaRef}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
          <Button
            type='submit'
            disabled={!token || isSubmitting}
            sx={{
              backgroundColor: (theme: any) => theme.palette.custom.main,
              color: (theme: any) => theme.palette.custom.border,
              fontSize: { xs: '15px', md: '18px' },
              fontWeight: 500,
              lineHeight: '158%',
              borderRadius: '4px',
              border: '1px solid #441e14',
              transition: 'all 0.3s ease',
              boxShadow: 'none !important',
              paddingBlock: { xs: '15px', md: '18px' },
              width: '100%',

              '&:hover': {
                backgroundColor: (theme: any) => theme.palette.custom.border,
                color: (theme: any) => theme.palette.custom.main,
                border: (theme) => `1px solid ${theme.palette.custom.border}`,
                '& svg': {
                  color: (theme: any) => theme.palette.custom.main,
                },
              },
              '&.Mui-disabled': {
                color: (theme: any) => theme.palette.custom.border,
              },
            }}
          >
            {isSubmitting ? (
              <CircularProgress
                size='20px'
                sx={{
                  '& svg': {
                    color: (theme: any) => theme.palette.custom.border,
                  },
                }}
              />
            ) : (
              'Submit'
            )}
          </Button>
        </Box>
      </Box>

      {isSuccess && (
        <MessageSnackbar
          sx={{
            '& .MuiSnackbarContent-message': {
              '& svg': {
                color: (theme: any) => theme.palette.custom.main,
                fontSize: { xs: '18px', lg: '25px' },
              },
              '& .MuiBox-root': {
                color: (theme: any) => theme.palette.custom.main,
                fontSize: { xs: '15px', md: '16px' },
                textAlign: 'center',
              },
              '& .MuiButtonBase-root': {
                width: { xs: '35px', xl: '40px' },
                height: { xs: '35px', xl: '40px' },
              },
            },
          }}
          open={isSuccess}
          sticky
          variant='pill'
          severity='success'
        >
          <Trans id='Form Submitted Successfully ' />
        </MessageSnackbar>
      )}
    </Box>
  )
}

export default ContactEnquiryForm
