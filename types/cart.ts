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
