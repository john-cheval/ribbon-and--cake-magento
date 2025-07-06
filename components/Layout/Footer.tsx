// import { useQuery } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
// import { useCheckoutGuestEnabled } from '@graphcommerce/magento-cart'
// import { StoreConfigDocument } from '@graphcommerce/magento-store'
// import { DateFormat, Footer as FooterBase } from '@graphcommerce/next-ui'
import { css } from '@emotion/react'
// import { Trans } from '@lingui/macro'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaTiktok } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { cardData, footerData, locationData } from '../../constants/Home'
import footerLogo from '../Assets/footer_logo.svg'
import send from '../Assets/send.svg'

const inputStyle = css`
  color: #000;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 400;
  line-height: 31px;
  font-size: 16px;
  padding: 15px 20px;
  outline: none;
  border: none;
  background-color: transparent;

  ::placeholder {
    color: #000;
    opacity: 1;
    font-family: 'Bricolage Grotesque', sans-serif;
  }
  /* Add vendor prefixes for wider browser compatibility with placeholder */
  &::-webkit-input-placeholder {
    color: #000;
    opacity: 1;
    font-family: 'Bricolage Grotesque', sans-serif;
  }
  &::-moz-placeholder {
    color: #000;
    opacity: 1;
    font-family: 'Bricolage Grotesque', sans-serif;
  }
  &::-ms-input-placeholder {
    color: #000;
    opacity: 1;
    font-family: 'Bricolage Grotesque', sans-serif;
  }
`

export function Footer() {
  // const cartEnabled = useCheckoutGuestEnabled()
  // const config = useQuery(StoreConfigDocument)
  const [email, setEmail] = useState('')

  // const websiteName = config.data?.storeConfig?.website_name
  // const year = <DateFormat dateStyle={undefined} year='numeric' date={new Date()} />

  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#F6F6F6',
        paddingTop: '65px',
        paddingInline: '55px',
      }}
    >
      <Box
        component='div'
        sx={{
          display: 'flex',
          columnGap: '20px',
          justifyContent: 'space-between',
          paddingBottom: '40px',
          borderBottom: '1px solid #D8D8D8;',
        }}
      >
        <Image
          src={footerLogo}
          alt='Ribbin and Ballons Logo'
          width={202}
          height={83}
          sizes='100vw'
          sx={{
            width: '100%',
            // maxWidth: '202px',
            // objectFit: 'cover',
          }}
        />

        {footerData?.map((data, index) => (
          <Box component='div' key={data?.id || index}>
            <Typography
              component='p'
              sx={{
                color: '#2A110A',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: '33px',
                marginBottom: '20px',
              }}
            >
              {data?.mainTitle}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {data?.links?.map((link, idx) => (
                <Link
                  style={{
                    textDecoration: 'none',
                    color: '#2A110A',
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '33px',
                  }}
                  key={link?.id || idx}
                  href={link?.href || '/'}
                >
                  {link?.link}
                </Link>
              ))}
            </Box>
          </Box>
        ))}

        <Box component='div'>
          <Typography
            component='p'
            sx={{
              color: '#2A110A',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '33px',
              marginBottom: '20px',
            }}
          >
            Subscribe
          </Typography>

          <Typography
            component='p'
            sx={{
              color: '#2A110A',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '31px',
              maxWidth: '320px',
            }}
          >
            Please enter your email address to receivedaily newsletter of our blog posts.
          </Typography>

          <Box>
            <Box
              sx={{
                position: 'relative',
                border: '1px solid #9B7C38',
                borderRadius: '8px',
                marginTop: '50px',
                marginBottom: '25px',
              }}
            >
              <Box
                component='input' // Render Box as an input element
                placeholder='Your email id'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                css={inputStyle} // Apply the css prop here
              />

              <Box
                sx={{
                  position: 'absolute',
                  backgroundColor: '#9B7C38',
                  padding: '14px 24px',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  height: '100%',
                  borderRadius: '0px 8px 8px 0px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={send}
                  alt='send'
                  width={24}
                  height={24}
                  sizes='100vw'
                  sx={{
                    width: '100%',
                    maxWidth: '24px',

                    // objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>
            <Box
              component='div'
              sx={{
                display: 'flex',
                gap: '23px',
                alignItems: 'center',
              }}
            >
              <Typography
                component='span'
                sx={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 400,
                  lineHeight: '205.5%',
                  fontSize: '16px !important',
                  color: '#333',
                  // marginTop: '25px',
                }}
              >
                Spread The Love
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Link
                  href='/'
                  target='_blank'
                  style={{
                    textDecoration: 'none',
                    color: '#441E14',
                    fontSize: '24px',
                  }}
                >
                  <AiFillInstagram />
                </Link>
                <Link
                  href='/'
                  target='_blank'
                  style={{
                    textDecoration: 'none',
                    color: '#441E14',
                    fontSize: '20px',
                  }}
                >
                  <FaTiktok />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Locations */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBlock: '45px',
          borderBottom: '1px solid #D8D8D8',
        }}
      >
        {locationData?.map((locate, index) => (
          <Box
            key={locate?.id || index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            <Typography
              component='p'
              sx={{
                color: '#2A110A',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: '33px',
              }}
            >
              {locate?.location}
            </Typography>

            <Box>
              <Box
                sx={{
                  minHeight: '100px',
                }}
              >
                <Typography
                  component='p'
                  sx={{
                    color: '#2A110A',
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '33px',
                    maxWidth: '310px',
                  }}
                >
                  {locate?.address}
                </Typography>

                <Link
                  href={`tel:${locate?.phone}`}
                  style={{
                    color: '#2A110A',
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '33px',
                    textDecoration: 'none',
                  }}
                >
                  {locate?.phone}
                </Link>
              </Box>

              <Link href={locate?.map || '/'} passHref legacyBehavior>
                <Box
                  component='a'
                  sx={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '31px',
                    color: '#9B7C38',
                    border: '1px solid #9B7C38',
                    borderRadius: '50px',
                    padding: '8px 25px',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px',
                    width: 'fit-content',
                    textDecoration: 'none',
                    marginTop: '15px',
                  }}
                >
                  View Map <FaLocationDot />
                </Box>
              </Link>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Footer Bootom */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBlock: '16px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '23px', alignItems: 'center' }}>
          <Typography
            component='span'
            sx={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 400,
              lineHeight: '205.5%',
              fontSize: '16px !important',
              color: '#333',
              // marginTop: '25px',
            }}
          >
            Secure Payment
          </Typography>

          <Box sx={{ display: 'flex', gap: '13px', alignItems: 'center' }}>
            {cardData?.map((card, index) => (
              <Image
                key={card?.id || index}
                src={card?.image}
                alt={card?.alt}
                width={38}
                height={24}
                sizes='100vw'
                sx={{
                  width: '100%',
                  // maxWidth: '202px',
                  // objectFit: 'cover',
                }}
              />
            ))}
          </Box>
        </Box>

        <Typography
          component='span'
          sx={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 400,
            lineHeight: '205.5%',
            fontSize: '16px !important',
            color: '#000',
            textDecoration: 'none',
            // marginTop: '25px',
          }}
        >
          © Ribbons & Balloons 2025. Designed & Developed by{' '}
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
            href='https://chevalme.com/'
            target='_blank'
          >
            Cheval
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
