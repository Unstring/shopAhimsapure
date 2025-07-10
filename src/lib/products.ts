
import productsData from '@/lib/products.json';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  data_ai_hint?: string;
};

export const products: Product[] = productsData;
