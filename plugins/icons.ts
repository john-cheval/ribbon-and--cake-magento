import { PluginConfig } from '@graphcommerce/next-config'
import ThemeiconShoppingBag from './Svgs/addToCart.svg'
import ThemeArrowDropdown from './Svgs/arrowDropDown.svg'
import ThemeiconArrowDropDownUp from './Svgs/arrowDropDownUp.svg'
import ThemeiconDelete from './Svgs/customDelete.svg'
// import ThemeiconHeart from './Svgs/customHeart.svg'
import ThemeiconPerson from './Svgs/customPerson.svg'
import ThemeiconEqualizer from './Svgs/equalizer.svg'
import ThemeiconcloseAccordion from './Svgs/iconChevronDown.svg'
import ThemeiconopenAccordion from './Svgs/iconChevronOpen.svg'
import ThemeiconSearch from './Svgs/iconSearch.svg'

export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/next-ui',
}

export const iconShoppingBag = ThemeiconShoppingBag
export const iconFilterProduct = ThemeiconEqualizer
export const iconSearch = ThemeiconSearch
export const iconOpenAccordion = ThemeiconopenAccordion
export const iconCloseAccordion = ThemeiconcloseAccordion
export const iconDelete = ThemeiconDelete
// export const iconHeart = ThemeiconHeart
export const iconPerson = ThemeiconPerson
export const iconArrowDropDown = ThemeArrowDropdown
export const iconArrowDropDownUp = ThemeiconArrowDropDownUp
