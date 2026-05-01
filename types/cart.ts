export interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  emoji: string;
  gradientColors: [string, string];
  buttonColor: string;
}

export interface CartItem {
  entryId: string;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'DECREMENT'; entryId: string }
  | { type: 'REMOVE'; entryId: string };
