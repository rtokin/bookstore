export interface Product {
  docId?: string;    
  id: number;
  title: string;
  author: string;
  price: string;
  image: string;
  section: "new" | "best" | "coming";
}
