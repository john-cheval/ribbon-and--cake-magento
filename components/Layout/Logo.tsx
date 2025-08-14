import { Logo as LogoBase } from '@graphcommerce/next-ui'
// import footerLogo from './footer_logo.svg'
import svgLogo from './Logo.svg'

interface LogoProps {
  isHome?: boolean
}

export function Logo({ isHome }: LogoProps) {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: '16px', md: isHome ? '20px' : 'auto' },
          marginRight: '5px',
          //paddingLeft: { xs: '10px', md: isHome ? '35px' : '' },
          marginTop: { xs: 0, md: '-5px' },
          // filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
        },
      }}
      image={{
        alt: 'Ribbin and Ballons Logo',
        src: isHome ? svgLogo : svgLogo,
        unoptimized: true,
      }}
    />
  )
}
