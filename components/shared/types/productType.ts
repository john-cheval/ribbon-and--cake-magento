import { StaticImageData } from 'next/image'

export interface ProductItemType {
  id?: number
  image: string | StaticImageData
  title: string
  price?: number | undefined | string
  category?: string
  startPrice?: number | undefined | string
  endPrice?: number | undefined | string
}
