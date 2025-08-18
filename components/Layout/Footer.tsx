import { useMutation, useQuery } from '@apollo/client'
import { Box } from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa'
import { AlekseonFormDocument } from '../../graphql/aleskonForm.gql'
import { UpdateAlekseonFormDocument } from '../../graphql/UpdateAleskonForm.gql'

export function Footer({ footerContent }) {
  const [updateAlekseonForm, { data, loading: isSubmitting, error }] = useMutation(
    UpdateAlekseonFormDocument,
  )

  const {
    data: formData,
    loading: formLoading,
    error: formError,
  } = useQuery(AlekseonFormDocument, {
    variables: {
      identifier: 'newsletter',
    },
  })
  const formFields = formData?.AlekseonForm?.Forms?.[0]?.formfield || []
  const { control, handleSubmit, reset } = useForm({
    defaultValues: formFields.reduce(
      (acc, field) => {
        if (field?.attribute_code) {
          acc[field.attribute_code] = ''
        }
        return acc
      },
      {} as Record<string, string>,
    ),
  })
  const isSuccess = data?.updateAlekseonForm?.success

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: footerContent }} />

      <Link
        href={
          'https://api.whatsapp.com/send/?phone=971528899029&text&type=phone_number&app_absent=0'
        }
      >
        <Box
          sx={{
            width: '100%',
            display: { xs: 'flex', lg: 'flex' },
            justifyContent: 'end',
          }}
        >
          <Box
            sx={{
              height: '50px',
              width: '50px',
              background: '#00CF03',
              position: 'fixed',
              right: '20px',
              bottom: { xs: '100px', lg: '20px' },
              color: (theme: any) => theme.palette.primary.contrastText,
              zIndex: '8888888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              fontSize: '25px',
            }}
          >
            <FaWhatsapp />
          </Box>
        </Box>
      </Link>
    </>
  )
}
