import { ProductCaseItem } from '../types/product-case'

export function transform(raw: any[]): ProductCaseItem[] {
  return raw.map(item => ({
    id: item.id,
    section: item.section,
    ProductPhoto: { src: item.ProductPhoto?.src },
    descriptionOfBook: { text: item.descriptionOfBook?.text },
    AuthorOfBook: {
      text: item.AuthorOfBook?.text,
      link: item.AuthorOfBook?.link,
    },
    PriceOfBook: { text: item.PriceOfBook?.text },
    stars: item.stars ?? [],
  }))
}