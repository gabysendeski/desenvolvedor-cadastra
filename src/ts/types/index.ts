export interface Product {
  id: string;
  name: string;
  price: number;
  parcelamento: [number, number];
  color: string;
  image: string;
  size: string[];
  date: string;
  order?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface FilterState {
  colors: string[];
  sizes: string[];
  priceRange: {
    min: number;
    max: number;
  };
}