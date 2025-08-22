import { Box } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import * as React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { GoPlus } from 'react-icons/go'
import { LuMinus } from 'react-icons/lu'

export default function FooterAccordion({ linksData, expanded, onChange, id, isLocation = false }) {
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: 'transparent ',
          boxShadow: 'none',
          borderRadius: 'none',
        }}
        expanded={expanded}
        onChange={onChange}
      >
        <AccordionSummary
          expandIcon={expanded ? <LuMinus size={20} /> : <GoPlus size={20} />}
          aria-controls='panel1-content'
          id='panel1-header'
          sx={{
            padding: '0 !important',
            '& svg': {
              color: (theme: any) => theme.palette.custom.smallHeading,
            },
          }}
        >
          <Typography
            component='span'
            sx={{
              color: (theme: any) => theme.palette.custom.smallHeading,
              fontSize: { xs: '15px', md: '16px' },
              fontWeight: 700,
              lineHeight: '33px',
            }}
          >
            {linksData?.mainTitle ? linksData?.mainTitle : linksData?.location}
          </Typography>
        </AccordionSummary>

        {linksData?.links &&
          !isLocation &&
          linksData?.links?.map((link, index) => (
            <AccordionDetails
              key={index}
              sx={{
                padding: '8px 0px 10px',
              }}
            >
              <Link href={link?.href}>{link?.link}</Link>
            </AccordionDetails>
          ))}

        {isLocation && (
          <AccordionDetails
            sx={{
              padding: '8px 0px 15px',
            }}
          >
            <Box
              sx={
                {
                  // minHeight: '100px',
                }
              }
            >
              <Typography
                component='p'
                sx={{
                  color: '#2A110A',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '33px',
                  // maxWidth: '310px',
                }}
              >
                {linksData?.address}
              </Typography>

              <Link
                href={`tel:${linksData?.phone}`}
                style={{
                  color: '#2A110A',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '33px',
                  textDecoration: 'none',
                }}
              >
                {linksData?.phone}
              </Link>
            </Box>

            <Link href={linksData?.map || '/'} passHref legacyBehavior>
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
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  )
}
