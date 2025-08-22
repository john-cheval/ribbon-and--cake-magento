import { useMutation, useQuery } from '@apollo/client'
import { Box } from '@mui/material'
import Link from 'next/link'
import { useEffect } from 'react'
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

  const isSuccess = data?.updateAlekseonForm?.success

  useEffect(() => {
    const summaries = document.querySelectorAll<HTMLDivElement>('.footer-accordion-summary')

    const handlers: Array<() => void> = []

    summaries.forEach((summary) => {
      const handler = () => {
        const item = summary.closest('.footer-accordion-item')
        const details = item?.querySelector<HTMLElement>('.footer-accordion-details')
        summary.classList.toggle('is-expanded')
        details?.classList.toggle('is-expanded')
      }

      summary.addEventListener('click', handler)
      handlers.push(() => summary.removeEventListener('click', handler))
    })

    return () => {
      handlers.forEach((remove) => remove())
    }
  }, [footerContent])

  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>('.send-button')
    const input = document.querySelector<HTMLInputElement>('#news-letter')

    const handler = async () => {
      if (!input?.value) {
        // alert('Please enter your email')
        return
      }

      try {
        await updateAlekseonForm({
          variables: {
            input: {
              identifier: 'newsletter',
              fields: [
                { fieldIdentifier: formFields[0]?.attribute_code || '', value: input.value },
              ],
            },
          },
        })
        if (isSuccess) {
          // alert('Subscribed successfully!')
          input.value = ''
        }
      } catch (e) {
        console.error(e)
        // alert('Something went wrong. Try again.')
      }
    }

    button?.addEventListener('click', handler)

    return () => button?.removeEventListener('click', handler)
  }, [updateAlekseonForm, isSuccess])

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
            display: { xs: 'flex' },
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
