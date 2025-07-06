import { StaticImageData } from 'next/image'

export interface ProductItemType {
  id?: number
  image: StaticImageData
  title: string
  price?: string
  category?: string
  startPrice?: string
  endPrice?: string
}
