import localFont from 'next/font/local'

export const saxoGrammaticus = localFont({
  src: [
    {
      path: '../public/fonts/SaxoGrammaticusLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SaxoGrammaticusLight.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SaxoGrammaticusRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SaxoGrammaticusRegular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SaxoGrammaticusBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-saxo',
})
