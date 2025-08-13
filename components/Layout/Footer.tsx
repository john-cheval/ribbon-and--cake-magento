import { Image } from '@graphcommerce/image'
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { cardData, footerData, locationData } from '../../constants/Home'
import footerLogo from '../Assets/footer_logo.svg'
import send from '../Assets/send.svg'
import FooterAccordion from './MobileFooter/FooterAccordion'
import FooterSocial from './MobileFooter/FooterSocial'

export function Footer({ footerContent }) {
  const [email, setEmail] = useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [expandedPanel, setExpandedPanel] = useState<number | null>(null)

  const handleChange =
    (panelIndex: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanel(isExpanded ? panelIndex : null)
    }
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: footerContent }} />

      <Link href={'/'}>
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
      {/*  </Box>*/}
    </>
  )
}
