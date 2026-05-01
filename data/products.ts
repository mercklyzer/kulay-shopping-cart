import type { Product } from '@/types/cart';

export const products: Product[] = [
  {
    id: '1',
    productName: 'Valencia Orange Juice',
    description:
      'Cold-pressed from hand-picked Valencia oranges. 1L bottle, no added sugar.',
    price: 120,
    emoji: '🍊',
    gradientColors: ['#FFE5D5', '#FFCBA8'],
    buttonColor: '#FF6B35',
  },
  {
    id: '2',
    productName: 'Organic Matcha Powder',
    description:
      'Ceremonial grade from Uji, Japan. 30g tin, vibrant green, rich umami flavor.',
    price: 380,
    emoji: '🌿',
    gradientColors: ['#D5F5E3', '#A8E6C8'],
    buttonColor: '#22C55E',
  },
  {
    id: '3',
    productName: 'Wild Blueberry Jam',
    description:
      'Low-sugar preserve made from wild-harvested blueberries. 250g glass jar.',
    price: 210,
    emoji: '🫐',
    gradientColors: ['#E8D5FF', '#D0A8FF'],
    buttonColor: '#A855F7',
  },
  {
    id: '4',
    productName: 'Extra Virgin Olive Oil',
    description:
      'Single-origin from Kalamata, Greece. First cold press, 500ml dark bottle.',
    price: 495,
    emoji: '🫚',
    gradientColors: ['#D5EEFF', '#A8D6FF'],
    buttonColor: '#3B82F6',
  },
];
