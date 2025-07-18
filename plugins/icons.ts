import { PluginConfig } from '@graphcommerce/next-config'
import ThemeiconShoppingBag from './Svgs/addtocart.svg'
import ThemeiconSearch from './Svgs/customSearch.svg'
import ThemeiconEqualizer from './Svgs/equalizer.svg'
import ThemeiconcloseAccordion from './Svgs/iconChevronDown.svg'
import ThemeiconopenAccordion from './Svgs/iconChevronOpen.svg'

export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/next-ui',
}

export const iconShoppingBag = ThemeiconShoppingBag
export const iconFilterProduct = ThemeiconEqualizer
export const iconSearch = ThemeiconSearch
export const iconOpenAccordion = ThemeiconopenAccordion
export const iconCloseAccordion = ThemeiconcloseAccordion
