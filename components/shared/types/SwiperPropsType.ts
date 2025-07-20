import { ProductItemType, TestiProductItemType } from './productType'

export interface SwiperPropType {
  data: ProductItemType[]
  link?: string
  initial?: string
}

export interface TestimonialSwiperPropsType {
  data: TestiProductItemType[]
}
