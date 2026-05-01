import { createContext, type ReactNode, useReducer } from 'react';

import { VOUCHERS } from '@/data/vouchers';
import type { CartAction, CartItem, CartState } from '@/types/cart';

export interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  voucherCode: string;
  isVoucherValid: boolean;
  discountedTotal: number;
  dispatch: React.Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = {
  items: [],
  voucherCode: '', // apply only one voucher at a time for simplicity
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      const newItem: CartItem = {
        entryId: action.product.id,
        product: action.product,
        quantity: 1,
      };
      return { ...state, items: [...state.items, newItem] };
    }
    case 'DECREMENT': {
      const target = state.items.find((i) => i.entryId === action.entryId);
      if (!target) return state;
      if (target.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.entryId !== action.entryId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.entryId === action.entryId ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => i.entryId !== action.entryId),
      };
    case 'SET_VOUCHER':
      return {
        ...state,
        voucherCode: action.code,
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  const matchedVoucher = VOUCHERS.find(
    (v) => v.code === state.voucherCode.trim().toLowerCase(),
  );
  const isVoucherValid = matchedVoucher !== undefined;
  const discountedTotal = matchedVoucher
    ? subtotal * (1 - matchedVoucher.discount)
    : subtotal;

  const value: CartContextValue = {
    items: state.items,
    count,
    subtotal,
    voucherCode: state.voucherCode,
    isVoucherValid,
    discountedTotal,
    dispatch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
