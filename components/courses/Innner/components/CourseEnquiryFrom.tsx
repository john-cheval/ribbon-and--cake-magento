import { MessageSnackbar } from '@graphcommerce/next-ui'
import { useMutation, useQuery } from '@apollo/client'
import { Trans } from '@lingui/react'
import { Box, Button, CircularProgress, OutlinedInput, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AlekseonFormDocument } from '../../../../graphql/aleskonForm.gql'
import { UpdateAlekseonFormDocument } from '../../../../graphql/UpdateAleskonForm.gql'
import ReCaptcha from '../../../../utils/ReCaptcha'

interface RecaptchaRefType {
  resetCaptcha: () => void
}

interface CourseEnquiryFormValues {
  'Class Type': string
  'Your Name': string
  'Your Phone': string
  'Your Email': string
  'Preferred Month and Week': string
  'Number of attendees': string
  'Your Message': string
}

const inputFieldSx: SxProps<Theme> = {
  borderRadius: '4px',
  color: '#441E14',
  height: 'fit-content',

  '& input[type="number"]': {
    MozAppearance: 'textfield', // Firefox
  },
  '& .MuiFormLabel-root': {
    color: '#441E14', // Use a visible color
  },
  '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
    {
      WebkitAppearance: 'none', // Chrome, Safari
      margin: 0,
    },

  '& .mui-style-ymipag-MuiButtonBase-root-MuiButton-root.Mui-disabled ': {
    color: (theme: any) => theme.palette.custom.main,
  },

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
    color: '#441E14',
    opacity: 1,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c5c5c5',
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c5c5c5',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    borderColor: '#c5c5c5',
    borderWidth: '1px !important',
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px !important',
    },
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c5c5c5',
    borderWidth: '1px !important',
  },
  '& .mui-style-y9718c-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ':
    {
      borderColor: '#c5c5c5',
      borderWidth: '1px !important',
    },
  '& .mui-style-y9718c-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
    {
      borderColor: '#c5c5c5',
    },
}

function CourseEnquiryForm({ defaultTitle }) {
  const recaptchaRef = useRef<RecaptchaRefType>(null)
  const [token, setToken] = useState('')

  const [updateAlekseonForm, { data, loading: isSubmitting }] = useMutation(
    UpdateAlekseonFormDocument,
  )

  const {
    data: formData,
    loading: formLoading,
    error: formError,
  } = useQuery(AlekseonFormDocument, {
    variables: {
      identifier: 'baking-classes',
    },
  })

  const formFields = formData?.AlekseonForm?.Forms?.[0]?.formfield || []

  const { control, handleSubmit, reset } = useForm<CourseEnquiryFormValues>({
    defaultValues: {
      'Class Type': defaultTitle,
      'Your Name': '',
      'Your Phone': '',
      'Your Email': '',
      'Preferred Month and Week': '',
      'Number of attendees': '',
      'Your Message': '',
    },
  })

  const isSuccess = data?.updateAlekseonForm?.success

  useEffect(() => {
    if (isSuccess) {
      reset()
      setToken('')
      if (recaptchaRef.current) {
        recaptchaRef.current.resetCaptcha()
      }
    }
  }, [isSuccess, reset, recaptchaRef])

  const onSubmit = async (values: CourseEnquiryFormValues) => {
    if (!token) {
      console.error('Please verify the captcha')
      return
    }

    try {
      const fields = formFields
        ?.filter((field) => typeof field?.attribute_code === 'string')
        .map((field) => ({
          fieldIdentifier: field!.attribute_code as string,
          value: values[field!.frontend_label as keyof CourseEnquiryFormValues] || '',
        }))

      await updateAlekseonForm({
        variables: {
          input: {
            identifier: 'baking-classes',
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
        marginTop: { xs: '20px', md: '0' },
        backgroundColor: '#F6F6F6',
        borderRadius: '8px',
        padding: { xs: '26px 14px', md: '30px 38px 40px' },
      }}
    >
      <Typography variant='h2' component='h3' sx={{ textTransform: 'uppercase' }}>
        Apply Now
      </Typography>

      <Box
        sx={{
          marginTop: { xs: '10px', md: '20px' },
          display: 'flex',
          rowGap: '11px',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'none' }}>
          <Controller
            name='Class Type'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Class Type'
                value={defaultTitle}
                disabled
                sx={inputFieldSx}
              />
            )}
          />
        </Box>

        <Controller
          name='Your Name'
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
          name='Your Phone'
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
                label='Your Phone'
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
          name='Your Email'
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <TextField {...field} fullWidth label='Your Email' sx={inputFieldSx} />
              {fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          name='Preferred Month and Week'
          control={control}
          rules={{ required: 'This field is Madatory' }}
          render={({ field, fieldState }) => (
            <>
              <TextField {...field} fullWidth label='Preferred Month and Week' sx={inputFieldSx} />
              {fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          name='Number of attendees'
          control={control}
          rules={{ required: 'Field is Required' }}
          render={({ field, fieldState }) => (
            <>
              <TextField
                {...field}
                type='number'
                fullWidth
                label='Number of attendees'
                sx={inputFieldSx}
                inputProps={{ min: 0 }}
                onChange={(e) => {
                  const value = e.target.value
                  const numValue = parseInt(value, 10)
                  if (value === '' || numValue >= 0) {
                    field.onChange(value)
                  }
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

        <Box>
          <Controller
            name='Your Message'
            control={control}
            render={({ field }) => (
              <TextField
                id='custom-textarea'
                {...field}
                label='Your Message (Optional)'
                multiline
                rows={3}
                fullWidth
                variant='outlined'
                sx={{
                  color: (theme: any) => theme.palette.custom.main,
                  fontSize: '20px',
                  borderRadius: '4px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#c5c5c5',
                      '& legend': {
                        color: (theme: any) => theme.palette.custom.main,
                      },
                    },
                    '&:hover fieldset': {
                      borderColor: (theme: any) => theme.palette.custom.borderInput,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#c5c5c5',
                      borderWidth: '1px !important',
                    },
                    '& textarea': {
                      padding: '10px',
                    },
                  },
                  '& .MuiFormLabel-root': {
                    color: (theme: any) => theme.palette.custom.main,
                  },
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            marginTop: '10px',
          }}
        >
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
              cursor: !token || isSubmitting ? 'none' : 'auto',
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
                size='30px'
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

export default CourseEnquiryForm
