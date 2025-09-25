import { Box, CircularProgress, styled, TextField, Typography, Theme, SxProps } from '@mui/material'
import { m } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import bgImage from '../../constants/images/account/Frame.png'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { UpdateAlekseonFormDocument } from '../../graphql/UpdateAleskonForm.gql'
import { AlekseonFormDocument } from '../../graphql/aleskonForm.gql'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@mui/lab'
import CustomizedCakeDate from './DateInput'
import ReCaptcha from '../../utils/ReCaptcha'
import { Button, MessageSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import dayjs from 'dayjs'

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
const MotionDiv = styled(m.div)({})

type Props = {
  setIsOpen: any,
  product: any,
  uid: string
}

function CustomisedCakeForm({ setIsOpen, product, uid }: Props) {
  // console.log(product, uid, 'fro the data')
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
      identifier: 'contact-us-for-your-customised-cake',
    },
  })
  const formFields = formData?.AlekseonForm?.Forms?.[0]?.formfield || []

  const getDefaultValues = () => {
    const values = formFields.reduce(
      (acc, field) => {
        if (field?.attribute_code) {
          acc[field.attribute_code] = ''
        }
        return acc
      },
      {} as Record<string, string>,
    )
    // Set default values for product name and UID directly
    const productNameField = formFields.find((f) => f?.frontend_label === 'Product Name')
    if (productNameField?.attribute_code && product) {
      values[productNameField.attribute_code] = product
    }

    const productUidField = formFields.find((f) => f?.frontend_label === 'Product Uid')
    if (productUidField?.attribute_code && uid) {
      values[productUidField.attribute_code] = uid
    }
    return values
  }

  const { control, handleSubmit, reset } = useForm({
    defaultValues: getDefaultValues(),
  })

  useEffect(() => {
    if (!formLoading && formFields.length > 0) {
      const newDefaultValues = getDefaultValues()
      reset(newDefaultValues)
    }
  }, [formLoading, formFields, reset])

  const isSuccess = data?.updateAlekseonForm?.success

  useEffect(() => {
    if (isSuccess) {
      const emptyValues = formFields.reduce(
        (acc, field) => {
          if (field?.attribute_code) {
            acc[field.attribute_code] = ''
          }
          return acc
        },
        {} as Record<string, string>,
      )
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

  const onSubmit = async (values: Record<string, any>) => {
    if (!token) {
      console.error('Please verify the captcha')
      return
    }
    try {
      const fields = formFields.map((field) => {
        const value = values[field?.attribute_code || '']
        return {
          fieldIdentifier: field!.attribute_code as string,
          value: field?.frontend_input === 'date' ? dayjs(value).format('YYYY-MM-DD') : value || '',
        }
      })

      await updateAlekseonForm({
        variables: {
          input: {
            identifier: 'contact-us-for-your-customised-cake',
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
    <MotionDiv
      sx={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.58)',
        zIndex: 999999,
        bottom: 0,
      }}>
      <MotionDiv
        sx={{
          background: '#fff',
          borderRadius: '30px 30px 0 0',
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: { xs: 'unset', md: '100% auto' },
          // backgroundPosition: '100% auto',
          height: '100%',
          width: '100%',
          bottom: 0,
          position: 'relative',
          marginTop: 'calc(200px * 0.5) !important',
          // paddingInline: { xs: '18px', md: '25px' },
        }}
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Box sx={{
          position: 'relative',
          backgroundImage: `url(${bgImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: { xs: 'unset', md: '100% auto' },
          backgroundPosition: '100% auto',
          height: '100%',
          width: '100%',
        }}>
          <Box
            onClick={() => setIsOpen(false)}
            sx={{
              cursor: 'pointer',
              alignSelf: 'flex-end',
              textAlign: 'right',
              position: 'absolute',
              top: { xs: '15px', md: '25px' },
              right: { xs: '15px', md: '25px' },
              '& svg': {
                fontWeight: 400,
                fontSize: { xs: '16px', md: '25px' },
                color: '#441e14',
              },
            }}
          >
            <IoClose />
          </Box>

          <Box sx={{
            paddingBlock: { xs: '20px', md: '40px' },
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}>
            <Typography variant='h2' sx={{
              textAlign: 'center',
            }}>Contact us</Typography>

            <Box component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                marginTop: { xs: '20px', lg: '40px' },
                maxWidth: { xs: '600px', lg: '700px', xl: '900px' },
                width: '100%',
                marginInline: 'auto',
              }}>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '10px', md: '18px' } }}>
                <Controller
                  name={formFields.find((f) => f?.frontend_label === 'Name')?.attribute_code || ''}
                  control={control}
                  rules={{ required: 'Name is Required' }}
                  render={({ field, fieldState }) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <TextField {...field} fullWidth label='Name' sx={inputFieldSx} />
                      {fieldState.error && (
                        <Typography variant='caption' color='error' >
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />

                <Controller
                  name={formFields.find((f) => f?.frontend_label === 'Phone')?.attribute_code || ''}
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <TextField
                        {...field}
                        fullWidth
                        label='Phone'
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
                    </Box>
                  )}
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '10px', md: '18px' }, marginTop: { xs: '10px', md: '18px' } }}>
                <Box sx={{ flex: 1 }}>
                  <Controller
                    name={formFields.find((f) => f?.frontend_label === 'Email')?.attribute_code || ''}
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <TextField {...field} fullWidth label='Email' sx={inputFieldSx} />
                        {fieldState.error && (
                          <Typography variant='caption' color='error'>
                            {fieldState.error.message}
                          </Typography>
                        )}
                      </Box>
                    )}
                  />
                </Box>
                <Box sx={{
                  flex: 1, '& .mui-style-18guw1f-FormRow-root': {
                    paddingBottom: '0 !important',
                  },
                  '& .mui-style-djqexv-MuiStack-root': {
                    paddingTop: '0 !important',
                  },
                }}>

                  <Controller
                    name={formFields.find((f) => f?.frontend_label === 'Event Date')?.attribute_code || ''}
                    control={control}
                    rules={{ required: 'Please select a delivery date.' }}
                    render={({ field, fieldState }) => (
                      <>
                        <CustomizedCakeDate
                          // Convert the string value from react-hook-form to a Dayjs object
                          value={field.value ? dayjs(field.value) : null}
                          // Convert the Dayjs value from DatePicker to a string for react-hook-form
                          onChange={(date) => {
                            field.onChange(date ? date.format('YYYY-MM-DD') : null);
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
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '10px', md: '18px' }, marginTop: { xs: '10px', md: '18px' } }}>
                <Controller
                  name={formFields.find((f) => f?.frontend_label === 'Message')?.attribute_code || ''}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id='custom-textarea'
                      label='Message'
                      multiline
                      rows={3}
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

              <Controller
                name={formFields.find((f) => f?.frontend_label === 'Product Name')?.attribute_code || ''}
                control={control}
                render={({ field }) => (
                  <TextField {...field} type='hidden' sx={{ display: 'none' }} />
                )}
              />

              <Controller
                name={formFields.find((f) => f?.frontend_label === 'Product Uid')?.attribute_code || ''}
                control={control}
                render={({ field }) => (
                  <TextField {...field} type='hidden' sx={{ display: 'none' }} />
                )}
              />

              <Box sx={{ marginTop: { xs: '10px', md: '18px' }, display: 'flex', justifyContent: 'center' }}>
                <ReCaptcha
                  siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                  callback={handleToken}
                  ref={recaptchaRef}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: { xs: '10px', md: '18px' } }}>
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
                    maxWidth: { xs: '100%', md: '500px' },
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
          </Box>

        </Box>
      </MotionDiv>
    </MotionDiv >
  )
}

export default CustomisedCakeForm