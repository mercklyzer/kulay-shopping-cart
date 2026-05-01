import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  FlatList,
  type ListRenderItemInfo,
  Pressable,
  Text,
  View,
} from 'react-native';

import CartItemRow from '@/components/cart-item-row';
import { PRIMARY } from '@/constants/theme';
import { products } from '@/data/products';
import type { CartItem } from '@/types/cart';

// This will be removed later.
const ITEMS: CartItem[] = [
  { entryId: products[0].id, product: products[0], quantity: 2 },
  { entryId: products[2].id, product: products[2], quantity: 1 },
];

const EmptyState = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4 px-8">
      <Ionicons name="cart-outline" size={72} color="#D1D5DB" />
      <Text className="text-lg font-bold text-gray-900">
        Your cart is empty.
      </Text>
      <Text className="text-center text-sm text-gray-500">
        Add some products to get started.
      </Text>
      <Pressable
        className="mt-2 rounded-xl px-6 py-3 active:opacity-70"
        style={{ backgroundColor: PRIMARY }}
        onPress={() => router.push('/(tabs)')}
      >
        <Text className="font-semibold text-white">Browse Products</Text>
      </Pressable>
    </View>
  );
};

const renderItem = ({ item }: ListRenderItemInfo<CartItem>) => (
  <CartItemRow item={item} />
);

const keyExtractor = (item: CartItem) => item.entryId;

export default function CartScreen() {
  const count = ITEMS.length;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pt-14 pb-4">
        <Text className="text-2xl font-black tracking-tight text-gray-900">
          My Cart
        </Text>
        {count > 0 && (
          <Text className="text-sm text-gray-500">
            {count} item{count !== 1 ? 's' : ''}
          </Text>
        )}
      </View>

      {ITEMS.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={ITEMS}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
