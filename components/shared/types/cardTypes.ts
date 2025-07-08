import { ProductItemType } from './productType'

export type ProductCardIconPosition = 'left' | 'right'

export interface ProductCardProps {
  item: ProductItemType | null
  imageWidth?: number
  imageHeight?: number
  textColor?: string
  iconBgColor?: string
  iconColor?: string
  iconHoverBgColor?: string
  iconHoverColor?: string
  iconPosition?: ProductCardIconPosition
  top?: string
  right?: string
  left?: string
  padding?: string
  sku?: string
}
