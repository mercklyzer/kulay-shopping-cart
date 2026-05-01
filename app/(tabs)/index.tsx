import { Ionicons } from '@expo/vector-icons';
import { FlatList, type ListRenderItemInfo, Pressable, Text, View } from 'react-native';

import ProductCard from '@/components/product-card';
import { PRIMARY } from '@/constants/theme';
import { products } from '@/data/products';
import type { Product } from '@/types/cart';

export default function ShopScreen() {
  const renderItem = ({ item }: ListRenderItemInfo<Product>) => (
    <ProductCard product={item} />
  );

  const keyExtractor = (item: Product) => item.id;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pt-14 pb-4">
        <Text className="text-2xl font-black tracking-tight text-gray-900">
          ku<Text style={{ color: PRIMARY }}>lay</Text>
        </Text>
        <Pressable className="active:opacity-70">
          <Ionicons name="cart-outline" size={26} color="#111111" />
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
