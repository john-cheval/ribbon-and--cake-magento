import type { LinguiDocumentProps } from '@graphcommerce/lingui-next/server'
import { withLingui } from '@graphcommerce/lingui-next/server'
import type { EmotionCacheProps } from '@graphcommerce/next-ui/server'
import {
  DocumentBodyEnd,
  DocumentBodyStart,
  DocumentHeadEnd,
  DocumentHeadStart,
  getCssFlagsInitScript,
  normalizeLocale,
  withEmotionCache,
} from '@graphcommerce/next-ui/server'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

class Document extends NextDocument<EmotionCacheProps & LinguiDocumentProps> {
  render() {
    return (
      <Html lang={normalizeLocale(this.props.locale)}>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
          <link
            href='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap'
            rel='stylesheet'
          />
          <DocumentHeadStart key='head-start' {...this.props} />
          {getCssFlagsInitScript()}
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          <meta name='emotion-insertion-point' content='' />
          {this.props.emotionStyleTags}
          {this.props.linguiScriptTag}
          <DocumentHeadEnd key='head-end' {...this.props} />
        </Head>
        <body>
          <DocumentBodyStart key='body-start' {...this.props} />
          <Main />
          <NextScript />
          <DocumentBodyEnd key='body-start' {...this.props} />
        </body>
      </Html>
    )
  }
}

export default withEmotionCache(withLingui(Document, (locale) => import(`../locales/${locale}.po`)))
