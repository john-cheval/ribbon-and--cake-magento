// import { useQuery } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
// import { useCheckoutGuestEnabled } from '@graphcommerce/magento-cart'
// import { StoreConfigDocument } from '@graphcommerce/magento-store'
// import { DateFormat, Footer as FooterBase } from '@graphcommerce/next-ui'
import { css } from '@emotion/react'
// import { Trans } from '@lingui/macro'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { cardData, footerData, locationData } from '../../constants/Home'
import footerLogo from '../Assets/footer_logo.svg'
import send from '../Assets/send.svg'
import FooterAccordion from './MobileFooter/FooterAccordion'
import FooterSocial from './MobileFooter/FooterSocial'

const inputStyle = css`
  color: #441e14;
  font-weight: 400;
  line-height: 31px;
  font-size: 16px;
  padding: 15px 20px;
  outline: none;
  border: none;
  background-color: #f6f6f6;

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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [expandedPanel, setExpandedPanel] = useState<number | null>(null)

  // const websiteName = config.data?.storeConfig?.website_name
  // const year = <DateFormat dateStyle={undefined} year='numeric' date={new Date()} />
  const handleChange =
    (panelIndex: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanel(isExpanded ? panelIndex : null)
    }
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#F6F6F6',
        paddingTop: { xs: '30px', md: '40px', lg: '50px', xl: '65px' },
        paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        paddingBottom: { xs: '80px', lg: '0' },
      }}
    >
      <Box
        component='div'
        sx={{
          display: 'flex',
          columnGap: '20px',
          justifyContent: { xs: 'start', lg: 'space-between' },
          paddingBottom: { xs: '20px', md: '30px', lg: '40px' },
          borderBottom: '1px solid #D8D8D8',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box>
          <Image
            src={footerLogo}
            alt='Ribbin and Ballons Logo'
            width={202}
            height={83}
            sizes='100vw'
            sx={{
              width: '100%',
              marginBottom: '25px',
              maxWidth: { xs: '180px', md: '250px', lg: '100%' },
            }}
          />

          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <FooterSocial />
          </Box>
        </Box>

        {isMobile
          ? footerData?.map((data, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: '1px solid #C5C5C5',
                  borderTop: index === 0 ? '1px solid #C5C5C5' : 'none',
                }}
              >
                <FooterAccordion
                  linksData={data}
                  expanded={expandedPanel === index}
                  onChange={handleChange(index)}
                  id={index}
                />
              </Box>
            ))
          : footerData?.map((data, index) => (
              <Box component='div' key={data?.id || index}>
                <Typography
                  component='p'
                  sx={{
                    color: (theme: any) => theme.palette.custom.smallHeading,
                    fontSize: '20px',
                    fontWeight: 700,
                    lineHeight: '33px',
                    marginBottom: '5px',
                  }}
                >
                  {data?.mainTitle}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}
                >
                  {data?.links?.map((link, idx) => (
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: '#2A110A',
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

        <Box component='div' sx={{ marginTop: { xs: '10px', lg: '0', textAlign: 'center' } }}>
          <Typography
            component='p'
            sx={{
              color: (theme: any) => theme.palette.custom.smallHeading,
              fontSize: { xs: '14px', md: '16px', lg: '20px' },
              fontWeight: 700,
              lineHeight: '33px',
              marginBottom: { xs: 0, lg: '5px' },
            }}
          >
            Subscribe
          </Typography>

          <Typography
            component='p'
            sx={{
              color: (theme: any) => theme.palette.custom.smallHeading,
              fontSize: { xs: '14px', md: '16px' },
              fontWeight: 400,
              lineHeight: { xs: '20px', lg: '31px' },
              maxWidth: { xs: '100%', lg: '320px' },
              textAlign: { xs: 'center', lg: 'left' },
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
                marginTop: { xs: '10px', sm: '15px', lg: '50px' },
                marginBottom: { xs: '20px', lg: '25px' },
                maxWidth: { xs: '100%', md: '500px', lg: '100%' },
                marginInline: { xs: ' auto', lg: '0' },
              }}
            >
              <Box
                component='input'
                placeholder='Your email id'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                css={inputStyle}
              />
              <Box
                sx={{
                  position: 'absolute',
                  backgroundColor: '#9B7C38',
                  padding: '14px 24px',
                  right: 0,
                  top: '0',
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
                    width: '24px',
                    verticalAlign: 'center',

                    // objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                columnGap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FooterSocial />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Locations */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'start', lg: 'space-between' },
          paddingBlock: { xs: '0 15px', md: '10px 25px 0px', lg: '45px' },
          borderBottom: isMobile ? 'none' : '1px solid #D8D8D8',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {isMobile
          ? locationData?.map((locate, index) => (
              <Box key={index} sx={{ borderBottom: '1px solid #C5C5C5' }}>
                <FooterAccordion
                  linksData={locate}
                  expanded={expandedPanel === index + 1 * 10}
                  onChange={handleChange(index + 1 * 10)}
                  id={index}
                  isLocation={true}
                />
              </Box>
            ))
          : locationData?.map((locate, index) => (
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
                    color: (theme: any) => theme.palette.custom.smallHeading,
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
                        color: (theme: any) => theme.palette.custom.smallHeading,
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
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '31px',
                        color: (theme: any) => theme.palette.custom.heading,
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
          justifyContent: { xs: 'start', lg: 'space-between' },
          alignItems: 'center',
          paddingBlock: '16px',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: '5px', md: '13px', lg: '23px' },
            alignItems: 'center',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <Typography
            component='span'
            sx={{
              fontWeight: 400,
              lineHeight: '205.5%',
              fontSize: { xs: '14px', md: '16px' },
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
                  width: { xs: '35px', md: '40px' },
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
            fontWeight: 400,
            lineHeight: '205.5%',
            fontSize: { xs: '14px', md: '16px' },
            color: (theme: any) => theme.palette.custom.dark,
            textDecoration: 'none',
            textAlign: { xs: 'center', lg: 'left' },
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

      <Link href={'/'}>
        <Box
          sx={{
            width: '100%',
            display: { xs: 'none', lg: 'flex' },
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
              bottom: '20px',
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
    </Box>
  )
}
