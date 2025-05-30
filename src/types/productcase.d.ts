/**
 * Тип для одного объекта карточки из JSON-экспорта Figma
 */
export interface ProductCaseItem {
  id: number;
  section: 'new' | 'best' | 'coming';
  ProductPhoto: { src: string };
  descriptionOfBook: { text: string };
  AuthorOfBook: { text: string; link: string };
  PriceOfBook: { text: string };
  stars: string[];
}

/**
 * Тип всего массива карточек
 */
export type ProductCaseData = ProductCaseItem[];
