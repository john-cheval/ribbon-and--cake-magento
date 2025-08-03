import { FramerNextPages } from '@graphcommerce/framer-next-pages'
import { GraphQLProvider } from '@graphcommerce/graphql'
import { GlobalHead } from '@graphcommerce/magento-store'
import {
  CssAndFramerMotionProvider,
  DarkLightModeThemeProvider,
  PageLoadIndicator,
} from '@graphcommerce/next-ui'
import { CssBaseline } from '@mui/material'
import { AppProps } from 'next/app'
import { darkTheme, lightTheme } from '../components/theme'
import { saxoGrammaticus } from '../lib/fonts'
import { I18nProvider } from '../lib/i18n/I18nProvider'
import '../styles/global.css'

export default function ThemedApp(props: AppProps) {
  const { router } = props
  const { locale = 'en' } = router

  return (
    <div className={saxoGrammaticus.variable}>
      <CssAndFramerMotionProvider {...props}>
        <I18nProvider key={locale} locale={locale}>
          <GraphQLProvider {...props}>
            <DarkLightModeThemeProvider light={lightTheme} dark={darkTheme}>
              <GlobalHead />
              <CssBaseline />
              <PageLoadIndicator />
              <FramerNextPages {...props} />
            </DarkLightModeThemeProvider>
          </GraphQLProvider>
        </I18nProvider>
      </CssAndFramerMotionProvider>
    </div>
  )
}
