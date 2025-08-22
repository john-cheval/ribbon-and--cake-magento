import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import phone from '../call.svg'
import contactImage from '../image.jpg'
import message from '../message.svg'
import svgIcon from '../Vector.svg'

function ContactLeft() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'relative', zIndex: 500 }}>
        <Image
          src={contactImage}
          alt='contact-image'
          //width={700}
          //height={400}
          sx={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
        />
      </Box>

      <Box
        sx={{
          padding: { xs: '55px 30px 30px', md: '90px 58px 70px' },
          backgroundColor: (theme: any) => theme.palette.custom.border,
          borderRadius: '8px',
          marginTop: { xs: '-20px', md: '-40px' },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #F1A8B6',
            paddingBottom: { xs: '12px', md: '20px', lg: '25px' },
          }}
        >
          <Typography
            variant='h1'
            sx={{
              color: (theme: any) => theme.palette.custom.heading,
              fontWeight: '300 !important',
            }}
          >
            You got questions?
          </Typography>

          <Typography
            sx={{
              color: (theme: any) => theme.palette.custom.secondary,
              fontSize: { xs: '15px', md: '16px' },
              lineHeight: '170%',
              marginTop: { xs: '5px' },
            }}
          >
            Call us, mail us, or just a drop a message
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'start', md: 'center' },
            gap: { xs: '20px', md: '28px' },
            flexDirection: { xs: 'column', md: 'row' },
            paddingTop: { xs: '12px', md: '20px', lg: '30px' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '15px', md: '27px' } }}>
            <Image
              src={phone}
              alt='call'
              width={46}
              height={46}
              sx={{
                width: { xs: '20px', md: '30px', lg: '45px' },
                height: 'auto',
                objectFit: 'cover',
                maxWidth: '45px',
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '7px',
              }}
            >
              <Typography
                component='span'
                sx={{
                  color: (theme: any) => theme.palette.custom.dark,
                  fontSize: { xs: '15px' },
                  fontWeight: 500,
                }}
              >
                Call Us
              </Typography>

              <Link href={'tel:+971 0000 00000'}>
                <Typography
                  component='span'
                  sx={{
                    color: (theme: any) => theme.palette.custom.dark,
                    fontSize: { xs: '15px', md: '16px', lg: '20px' },
                    fontWeight: 500,
                  }}
                >
                  +971 0000 00000
                </Typography>
              </Link>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '15px', md: '27px' } }}>
            <Image
              src={message}
              alt='message'
              width={46}
              height={46}
              sx={{
                width: { xs: '20px', md: '30px', lg: '45px' },
                height: 'auto',
                objectFit: 'cover',
                maxWidth: '45px',
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '7px',
              }}
            >
              <Typography
                component='span'
                sx={{
                  color: (theme: any) => theme.palette.custom.dark,
                  fontSize: { xs: '15px' },
                  fontWeight: 500,
                }}
              >
                Email
              </Typography>

              <Link href={'mailto:info@ribbonsandballoons.com'}>
                <Typography
                  component='span'
                  sx={{
                    color: (theme: any) => theme.palette.custom.dark,
                    fontSize: { xs: '15px', md: '16px', lg: '20px' },
                    fontWeight: 500,
                  }}
                >
                  info@ribbonsandballoons.com
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          zIndex: 500,
          right: { xs: '14px', md: '28px' },
          top: { xs: '20%', sm: '50%', md: '40%', xl: '50%' },
        }}
      >
        <Image
          src={svgIcon}
          alt='svgIcon-image'
          width={195}
          height={280}
          sx={{
            //width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
            minHeight: { xs: '160px', md: '200px', xl: '250px' },
            width: 'auto',
          }}
        />
      </Box>
    </Box>
  )
}

export default ContactLeft
