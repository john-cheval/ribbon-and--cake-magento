import { MessageSnackbar } from '@graphcommerce/next-ui'
import { useMutation, useQuery } from '@apollo/client'
import { Trans } from '@lingui/react'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaWhatsapp } from 'react-icons/fa'
import { AlekseonFormDocument } from '../../graphql/aleskonForm.gql'
import { UpdateAlekseonFormDocument } from '../../graphql/UpdateAleskonForm.gql'

export function Footer({ footerContent }) {
  const router = useRouter()
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
  const fieldIdentifier = formFields[0]?.attribute_code
  const isSuccess = data?.updateAlekseonForm?.success
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (!footerContent) {
      return
    }
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
  }, [footerContent, router])

  useEffect(() => {
    if (!footerContent) {
      return
    }

    const button = document.querySelector<HTMLButtonElement>('.send-button')
    const input = document.querySelector<HTMLInputElement>('#news-letter')

    if (!input || !button) return
    const validateEmail = (value: string) => {
      // return /\S+@\S+\.\S+/.test(value) && value.endsWith('@gmail.com')
      return /\S+@\S+\.\S+/.test(value)
    }

    const toggleButtonState = () => {
      const isValid = validateEmail(input.value)
      button.disabled = !isValid || isSubmitting

      if (button.disabled) {
        button.classList.add('is-disabled')
      } else {
        button.classList.remove('is-disabled')
      }
    }
    const handler = async (event: MouseEvent) => {
      event.preventDefault()

      if (button.disabled || !fieldIdentifier) {
        return
      }
      if (!input?.value) {
        toggleButtonState()

        // alert('Please enter your email')
        return
      }

      try {
        const result = await updateAlekseonForm({
          variables: {
            input: {
              identifier: 'newsletter',
              fields: [{ fieldIdentifier: fieldIdentifier || '', value: input.value }],
            },
          },
        })
        if (result.data?.updateAlekseonForm?.success) {
          input.value = ''
          button.disabled = true
        }
      } catch (e) {
        console.error(e)
        // alert('Something went wrong. Try again.')
      }
    }
    toggleButtonState()

    input.addEventListener('input', toggleButtonState)
    button?.addEventListener('click', handler)

    // return () => button?.removeEventListener('click', handler)
    return () => {
      input.removeEventListener('input', toggleButtonState)
      button.removeEventListener('click', handler)
    }
  }, [updateAlekseonForm, isSuccess, fieldIdentifier, footerContent])

  // console.log(footerContent, 'this is the footerContent')

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: footerContent }} />

      <Link
        href={
          'https://api.whatsapp.com/send/?phone=971528899029&text&type=phone_number&app_absent=0'
        }
        target='_blank'
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
          <Typography component='span'>Newsletter Subscribed </Typography>
        </MessageSnackbar>
      )}
    </>
  )
}
