import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  type ListRenderItemInfo,
  Pressable,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '@/components/shop/ProductCard';
import { PRIMARY } from '@/constants/theme';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types/cart';

export default function ShopScreen() {
  const { items, count, dispatch } = useCart();

  const renderItem = ({ item }: ListRenderItemInfo<Product>) => {
    const cartItem = items.find((ci) => ci.product.id === item.id);
    return (
      <ProductCard
        product={item}
        quantity={cartItem?.quantity ?? 0}
        onIncrement={() => dispatch({ type: 'ADD', product: item })}
        onDecrement={() => dispatch({ type: 'DECREMENT', entryId: item.id })}
      />
    );
  };

  const keyExtractor = (item: Product) => item.id;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pb-4">
        <Text className="text-2xl font-black tracking-tight text-gray-900">
          ku<Text style={{ color: PRIMARY }}>lay</Text>
        </Text>
        <Pressable className="relative active:opacity-70">
          <Ionicons name="cart-outline" size={26} color="#111111" />
          {count > 0 && (
            <View
              className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center rounded-full"
              style={{ backgroundColor: PRIMARY }}
            >
              <Text className="text-xs font-bold text-white">
                {count > 99 ? '99+' : count}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
