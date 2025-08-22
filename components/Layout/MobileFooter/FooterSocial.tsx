import { Image } from '@graphcommerce/image'
import { Typography } from '@mui/material'
import Link from 'next/link'
import google from '../../Assets/google.svg'
import instagram from '../../Assets/instagram.svg'

function FooterSocial() {
  return (
    <>
      {' '}
      <Typography
        sx={{
          backgroundColor: (theme: any) => theme.palette.custom.border,
          padding: '8px 17px',
          borderRadius: '999px',
          color: (theme: any) => theme.palette.custom.main,
          fontSize: { xs: '15px', md: '16px' },
          width: 'fit-content',
        }}
      >
        <Link
          href='/'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Image
            src={instagram}
            width={30}
            height={30}
            sx={{
              width: { xs: '20px', md: '25px', lg: '30px' },
              height: 'auto',
              verticalAlign: 'center',
              position: 'relative',
              top: '4px',
            }}
          />
          Follow US
        </Link>
      </Typography>
      <Typography
        sx={{
          backgroundColor: (theme: any) => theme.palette.custom.border,
          padding: '8px 17px',
          borderRadius: '999px',
          color: (theme: any) => theme.palette.custom.main,
          fontSize: { xs: '15px', md: '16px' },
          marginTop: { xs: '0px', lg: '9px' },
          width: 'fit-content',
        }}
      >
        <Link
          href='/'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Image
            src={google}
            width={30}
            height={30}
            sx={{
              width: { xs: '20px', md: '25px', lg: '30px' },
              height: 'auto',
              verticalAlign: 'center',
              position: 'relative',
              top: '4px',
            }}
          />
          Review on Google
        </Link>
      </Typography>
    </>
  )
}

export default FooterSocial
