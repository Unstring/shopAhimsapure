
import productsData from '@/lib/products.json';

export type Review = {
  rating: number;
  author: string;
  date: string;
  comment: string;
  avatar: string;
};

export type Certification = {
  name: string;
  description: string;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp?: number;
  discounted_price?: number;
  images: string[];
  category: string;
  data_ai_hint?: string;
  details: {
    origin: string;
    shelfLife: string;
    ingredients: string;
    netWeight: string;
  };
  certifications: Certification[];
  reviews: Review[];
  info?: any;
};

export const products: Product[] = productsData.map(p => ({ ...p, image: p.images[0] }));
