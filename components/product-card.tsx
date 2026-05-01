import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { currencyFormatter } from '@/constants/theme';
import type { Product } from '@/types/cart';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <View
      className="mx-4 mb-4 overflow-hidden rounded-2xl bg-white shadow-sm"
      style={{ elevation: 2 }}
    >
      <LinearGradient
        colors={product.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="items-center justify-center py-8"
      >
        <Text style={{ fontSize: 64 }}>{product.emoji}</Text>
      </LinearGradient>

      <View className="px-4 pb-4 pt-3">
        <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
          {product.productName}
        </Text>
        <Text
          className="mt-1 text-sm leading-5 text-gray-500"
          numberOfLines={2}
        >
          {product.description}
        </Text>

        <View className="mt-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-gray-900">
            {currencyFormatter.format(product.price)}
          </Text>
          <Pressable
            className="rounded-xl px-4 py-2 active:opacity-70"
            style={{ backgroundColor: product.buttonColor }}
          >
            <Text className="text-sm font-semibold text-white">
              Add to Cart
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
