import { MessageSnackbar } from '@graphcommerce/next-ui'
import { useMutation, useQuery } from '@apollo/client'
import { Trans } from '@lingui/react'
import { Box, Button, CircularProgress, OutlinedInput, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { AlekseonFormDocument } from '../../../../graphql/aleskonForm.gql'
import { UpdateAlekseonFormDocument } from '../../../../graphql/UpdateAleskonForm.gql'

const inputFieldSx: SxProps<Theme> = {
  borderRadius: '4px',
  color: '#441E14',
  // padding: '16px ',
  height: 'fit-content',

  '& .MuiOutlinedInput-input, & .MuiOutlinedInput-input::placeholder': {
    fontFamily: '"Bricolage Grotesque"',
    fontSize: { xs: '12px', sm: '14px', md: '16px' },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '158%',
    color: 'inherit',
  },
  '& .MuiOutlinedInput-input::placeholder': {
    fontFamily: '"Bricolage Grotesque"',
    fontSize: { xs: '12px', sm: '14px', md: '16px' },
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

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#c5c5c5',
    borderWidth: '1px !important',
  },
}
function CourseEnquiryForm({ defaultTitle }) {
  const [updateAlekseonForm, { data, loading: isSubmitting, error }] = useMutation(
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

  const { control, handleSubmit, reset } = useForm({
    defaultValues: formFields.reduce(
      (acc, field) => {
        if (field?.frontend_label === 'Class Type' && field?.attribute_code) {
          acc[field.attribute_code] = defaultTitle
        } else if (field?.attribute_code) {
          acc[field.attribute_code] = ''
        }
        return acc
      },
      {} as Record<string, string>,
    ),
  })

  const isSuccess = data?.updateAlekseonForm?.success

  const onSubmit = async (values: Record<string, string>) => {
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
            identifier: 'baking-classes',
            fields,
          },
        },
      })
      reset()
    } catch (err) {
      console.error(err)
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
        <Controller
          name={formFields.find((f) => f?.frontend_label === 'Class Type')?.attribute_code || ''}
          control={control}
          //  rules={{ required: 'Name is Required' }}
          render={({ field, fieldState }) => (
            <>
              <OutlinedInput
                {...field}
                fullWidth
                value={defaultTitle}
                placeholder={defaultTitle}
                sx={inputFieldSx}
                disabled
                defaultValue={defaultTitle}
              />
              {/*fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )*/}
            </>
          )}
        />
        <Controller
          name={formFields.find((f) => f?.frontend_label === 'Your Name')?.attribute_code || ''}
          control={control}
          rules={{ required: 'Name is Required' }}
          render={({ field, fieldState }) => (
            <>
              <OutlinedInput {...field} fullWidth placeholder='Your Name' sx={inputFieldSx} />
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
              value: /^[0-9]*$/, // only digits
              message: 'Only numbers are allowed',
            },
            minLength: {
              value: 7, // optional: min length
              message: 'Phone number is too short',
            },
            maxLength: {
              value: 15, // optional: max length
              message: 'Phone number is too long',
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <OutlinedInput
                {...field}
                fullWidth
                placeholder='Your Phone'
                sx={inputFieldSx}
                onChange={(e) => {
                  // allow only digits in input
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
          name={formFields.find((f) => f?.frontend_label === 'Your Email')?.attribute_code || ''}
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email regex
              message: 'Enter a valid email address',
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <OutlinedInput {...field} fullWidth placeholder='Your Email' sx={inputFieldSx} />
              {fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />

        <Controller
          name={
            formFields.find((f) => f?.frontend_label === 'Preferred Month and Week')
              ?.attribute_code || ''
          }
          control={control}
          rules={{ required: 'This field is Madatory' }}
          render={({ field, fieldState }) => (
            <>
              <OutlinedInput
                {...field}
                fullWidth
                placeholder='Preferred Month and Week'
                sx={inputFieldSx}
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
          name={
            formFields.find((f) => f?.frontend_label === 'Number of attendees')?.attribute_code ||
            ''
          }
          control={control}
          rules={{ required: 'Field is Required' }}
          render={({ field, fieldState }) => (
            <>
              <OutlinedInput
                {...field}
                type='number'
                fullWidth
                placeholder='Number of attendees'
                sx={inputFieldSx}
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
            name={
              formFields.find((f) => f?.frontend_label === 'Your Message')?.attribute_code || ''
            }
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
                  // mt: 2,
                  // backgroundColor: (theme: any) => theme.palette.primary.contrastText,
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

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
          <Button
            type='submit'
            disabled={isSubmitting}
            sx={{
              // marginTop: '18px',
              backgroundColor: (theme: any) => theme.palette.custom.main,
              color: (theme: any) => theme.palette.custom.border,
              fontSize: { xs: '12px', sm: '14px', md: '18px' },
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
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
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
