import { StaticImageData } from 'next/image'

export interface ProductItemType {
  uid?: string
  image: string | StaticImageData
  name: string
  price?: number | undefined | string
  category?: string
  startPrice?: number | undefined | string
  endPrice?: number | undefined | string
  sku?: string
  url_path?: string
}

export interface TestiProductItemType {
  id?: number
  imageUrl: string | StaticImageData
  title: string
  description: string
}
