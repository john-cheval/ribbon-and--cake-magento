/// <reference types="@graphcommerce/next-ui/types" />

import {
  breakpointVal,
  MuiButtonInline,
  MuiButtonPill,
  MuiButtonResponsive,
  MuiChip,
  MuiFabSizes,
  MuiSlider,
  MuiSnackbar,
  NextLink,
  responsiveVal,
  themeBaseDefaults,
} from '@graphcommerce/next-ui'
import { alpha, createTheme, Theme } from '@mui/material'
import type { LinkProps } from '@mui/material/Link'
import { Components, PaletteOptions } from '@mui/material/styles'
import { saxoGrammaticus } from '../lib/fonts'

type ThemePaletteOptions = PaletteOptions & {
  custom: {
    main?: string
    secondary?: string
    tertiary?: string
    heading?: string
    dark?: string
    border?: string
    smallHeading?: string
    borderInput?: string
    wishlistColor?: string
    borderSecondary?: string
  }
}

const lightPalette: ThemePaletteOptions = {
  mode: 'light',
  custom: {
    main: '#441E14',
    heading: '#9B7C38',
    secondary: '#6F6F6F',
    tertiary: '#969696',
    dark: '#000',
    border: '#F6DBE0',
    smallHeading: '#2A110A',
    borderInput: '#D5B1B8',
    wishlistColor: '#F1A8B6',
    borderSecondary: '#d4d4d4',
  },
  primary: {
    main: '#441E14',
    contrastText: '#ffffff',
    dark: '#000000',
    // link: '#2A110A',
  },
  secondary: {
    main: '#006bff',
    light: '#d1e4ff',
    contrastText: '#ffffff',
  },
  background: {
    default: '#F9F9FA',
    paper: '#ffffff',
    image: '#ffffff',
  },
  divider: '#00000015',
  success: {
    main: '#01d26a',
  },
  action: {
    hoverOpacity: 0.12,
  },
  text: {
    primary: '#0F0F10',
    secondary: '#03031755',
    disabled: '#03031735',
  },
}

const darkPalette: ThemePaletteOptions = {
  mode: 'dark',
  custom: {
    main: '#441E14',
    heading: '#9B7C38',
    secondary: '#6F6F6F',
    tertiary: '#969696',
    dark: '#000',
    border: '#F6DBE0',
    smallHeading: '#2A110A',
    borderInput: '#D5B1B8',
    wishlistColor: '#F1A8B6',
    borderSecondary: '#d4d4d4',
  },
  primary: {
    main: '#441E14',
    contrastText: '#ffffff',
    dark: '#441E14',
  },
  secondary: {
    main: '#441E14',
    light: '#b0bec5',
    contrastText: '#000000',
  },
  background: {
    default: '#121212',
    paper: '#fff',
    image: '#ffffff',
  },
  divider: '#ffffff30',
  success: {
    main: '#01D26A',
  },
  action: {
    hoverOpacity: 0.16,
  },
  text: {
    primary: '#ffffff',
    secondary: '#ffffff80',
    disabled: '#ffffff30',
  },
}

export const fontSize = (from: number, to: number) =>
  breakpointVal('fontSize', from, to, themeBaseDefaults.breakpoints.values)

const commonHeadingProperties = {
  fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
  textTransform: 'uppercase' as const,
  fontWeight: 300,
  lineHeight: 'normal',
  letterSpacing: '0%',
}

// Create a theme instance.
const createThemeWithPalette = (palette: PaletteOptions) =>
  createTheme({
    palette,
    ...themeBaseDefaults,
    shape: { borderRadius: 3 },
    typography: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      // @see docs typography.md
      h1: {
        ...commonHeadingProperties,
        ...fontSize(25, 45),
      },
      h2: {
        ...commonHeadingProperties,
        ...fontSize(25, 45),
        color: '#9B7C38',
      },
      h3: {
        ...fontSize(25, 40),
      },
      h4: {
        ...fontSize(18, 26),
        fontWeight: 550,
        fontVariationSettings: "'wght' 550",
        lineHeight: 1.55,
      },
      h5: {
        ...fontSize(17, 20),
        fontWeight: 650,
        fontVariationSettings: "'wght' 650",
        lineHeight: 1.55,
      },
      h6: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        ...fontSize(15, 16),
        fontWeight: 400,
        lineHeight: 1.8,
        textDecoration: 'none',
        color: '#2A110A',
      },
      p: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        lineHeight: '158%',
        fontSize: '16px',
        letterSpacing: '0%',
        color: '#000',
      },

      navlink: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '16px',
        fontWeight: 400,
        fontVariationSettings: "'wght' 400",
        lineHeight: 1.6,
        textTransform: 'none',
        textDecoration: 'none',
        color: '#2A110A',
      },
      subtitle1: {
        ...fontSize(16, 19),
        fontWeight: 450,
        fontVariationSettings: "'wght' 460",
        lineHeight: 1.7,
      },
      fontWeightBold: 600,
      body1: {
        ...fontSize(15, 18),
        lineHeight: 1.7,
      },
      subtitle2: {
        ...fontSize(15, 16),
        fontWeight: 500,
        fontVariationSettings: "'wght' 520",
        lineHeight: 1.7,
      },
      body2: {
        ...fontSize(15, 15),
        lineHeight: 1.7,
      },
      caption: {
        // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
        ...fontSize(12, 13),
      },
      button: {},
      overline: {
        // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
        ...fontSize(12, 15),
        fontWeight: 500,
        letterSpacing: 1,
        lineHeight: 1.2,
        textTransform: 'uppercase',
      },
    },
    spacings: {
      xxs: responsiveVal(10, 16),
      xs: responsiveVal(12, 20),
      sm: responsiveVal(14, 30),
      md: responsiveVal(16, 50),
      lg: responsiveVal(24, 80),
      xl: responsiveVal(40, 100),
      xxl: responsiveVal(80, 160),
    },
    page: {
      horizontal: responsiveVal(10, 30),
      vertical: responsiveVal(10, 30),
    },
    appShell: {
      headerHeightSm: '46px',
      headerHeightMd: '80px',
      appBarHeightMd: '80px',
      appBarInnerHeightMd: '46px',
      containerSizingShell:
        import.meta.graphCommerce.containerSizingShell === 'BREAKPOINT' ? 'lg' : false,
      containerSizingContent:
        import.meta.graphCommerce.containerSizingContent === 'BREAKPOINT' ? 'lg' : false,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 641,
        md: 769,
        lg: 1025,
        xl: 1536,
      },
    },
  })

// todo: move most of the styles to the graphcommerce library while still allowing for extensibility.
const createOverrides = (theme: Theme): Components<Theme> => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        overflowY: 'scroll',
        backgroundColor: '#fff',
        color: '#000',
        fontFamily: "'Bricolage Grotesque', sans-serif",
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      '::selection': { background: alpha(theme.palette.primary.main, 0.6) },
      '::-moz-selection': { background: alpha(theme.palette.primary.main, 0.6) },
      '#__next': {
        position: 'relative',
      },
      'picture img': {
        filter: 'brightness(1.03)',
        willChange: 'filter',
      },
    },
  },

  // https://mui.com/material-ui/guides/routing/#global-theme-link
  // https://www.graphcommerce.org/docs/framework/links

  MuiLink: { defaultProps: { component: NextLink } as LinkProps },

  MuiButtonBase: { defaultProps: { LinkComponent: NextLink, disableRipple: true } },

  MuiContainer: {
    variants: [
      {
        props: { disableGutters: false },
        style: {
          paddingLeft: theme.page.horizontal,
          paddingRight: theme.page.horizontal,
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.page.horizontal,
            paddingRight: theme.page.horizontal,
          },
        },
      },
    ],
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: '16px', // https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/
      },
    },
  },

  MuiButton: {
    defaultProps: { color: 'inherit' },
    variants: [
      ...MuiButtonResponsive,
      ...MuiButtonPill,
      ...MuiButtonInline,
      {
        props: { variant: 'contained', color: 'inherit' },
        style: { backgroundColor: theme.palette.background.paper },
      },
      {
        props: { variant: 'outlined' },
        style: {
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        },
      },
      {
        props: { variant: 'text' },
        style: { borderRadius: '99em' },
      },
      {
        props: { variant: 'inline' },
        style: { borderRadius: '99em' },
      },
      {
        props: { color: 'primary' },
        style: {
          '&:not(.Mui-disabled)': {
            boxShadow: 'none',
          },
        },
      },
      {
        props: { color: 'secondary' },
        style: {
          '&:not(.Mui-disabled)': {
            boxShadow: 'none',
          },
        },
      },
    ],
  },

  MuiFab: {
    styleOverrides: {
      root: {
        '&.MuiFab-default': {
          backgroundColor: theme.palette.background.paper,
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
          },
          color: theme.palette.text.primary,
        },
      },
      colorInherit: {
        backgroundColor: 'inherit',
        '&:hover, &:focus': {
          backgroundColor: 'inherit',
        },
        boxShadow: 'none',
      },
      extended: {
        fontWeight: 400,
        textTransform: 'none',
      },
    },

    variants: [...MuiFabSizes],
  },

  MuiTextField: {
    // defaultProps: { color: 'secondary' },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '4px',
          fontSize: { xs: '15px', md: '16px' },
          color: '#441E14',
          '& .MuiSelect-icon': {
            color: '#F1A8B6',
            fill: '#F1A8B6',
          },
        },
        '& fieldset, .mui-style-1dmcmbw-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .mui-style-ioqfy8-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
          {
            borderColor: '#D5B1B8',
          },
        '& .MuiFormLabel-root': {
          color: '#441e14',
        },
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },

  MuiChip: {
    variants: [...MuiChip],
  },

  MuiCheckbox: {
    styleOverrides: {
      colorPrimary: {
        color: theme.palette.text.disabled,
        '&.Mui-checked': {
          color: theme.palette.primary.main,
        },
      },
      colorSecondary: {
        color: theme.palette.text.disabled,
        '&.Mui-checked': {
          color: theme.palette.secondary.main,
        },
      },
    },

    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: 7,
        },
      },
    ],
  },

  MuiSwitch: {
    styleOverrides: {
      thumb: {
        boxShadow: theme.shadows[6],
      },
    },
  },

  MuiSnackbar: { variants: [...MuiSnackbar] },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.palette.text.disabled,
      },
    },
  },

  MuiSlider: { variants: [...MuiSlider] },

  MuiCircularProgress: {
    defaultProps: {
      thickness: 2,
    },
  },
})

export const lightTheme = createThemeWithPalette(lightPalette)
lightTheme.components = createOverrides(lightTheme) as Components

export const darkTheme = createThemeWithPalette(darkPalette)
darkTheme.components = createOverrides(darkTheme) as Components

declare module '@mui/material/styles' {
  interface TypographyVariants {
    navlink: React.CSSProperties
    p: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    navlink?: React.CSSProperties
    p?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    navlink: true
    p: true
  }
}

declare module '@mui/material/Link' {
  interface LinkPropsVariantOverrides {
    navlink: true
    p: true
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      main?: string
      secondary?: string
      tertiary?: string
      heading?: string
      dark?: string
      border?: string
      smallHeading?: string
      borderInput?: string
      wishlistColor?: string
      borderSecondary?: string
    }
  }

  interface PaletteOptions {
    custom?: {
      main?: string
      secondary?: string
      tertiary?: string
      heading?: string
      dark?: string
      border?: string
      smallHeading?: string
      borderInput?: string
      wishlistColor?: string
      borderSecondary?: string
    }
  }
}
