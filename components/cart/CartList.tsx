import { FlatList, type ListRenderItemInfo } from 'react-native';

import CartItemRow from '@/components/cart/CartItemRow';
import type { CartItem, Product } from '@/types/cart';

interface Props {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (entryId: string) => void;
  onRemove: (entryId: string) => void;
}

const keyExtractor = (item: CartItem) => item.entryId;

const CartList = ({ items, onIncrement, onDecrement, onRemove }: Props) => {
  const renderItem = ({ item }: ListRenderItemInfo<CartItem>) => (
    <CartItemRow
      item={item}
      onIncrement={() => onIncrement(item.product)}
      onDecrement={() => onDecrement(item.entryId)}
      onRemove={() => onRemove(item.entryId)}
    />
  );

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 8 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CartList;
