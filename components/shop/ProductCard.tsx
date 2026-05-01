import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { currencyFormatter } from '@/constants/theme';
import type { Product } from '@/types/cart';

interface Props {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ProductCard = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
}: Props) => {
  const handleIncrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onIncrement();
  };

  const handleDecrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDecrement();
  };

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

          {quantity === 0 ? (
            <Pressable
              className="rounded-xl px-4 py-2 active:opacity-70"
              style={{ backgroundColor: product.buttonColor }}
              onPress={handleIncrement}
            >
              <Text className="text-sm font-semibold text-white">
                Add to Cart
              </Text>
            </Pressable>
          ) : (
            <View
              className="flex-row items-center overflow-hidden rounded-xl"
              style={{ backgroundColor: product.buttonColor }}
            >
              <Pressable
                className="px-3 py-2 active:opacity-70"
                onPress={handleDecrement}
              >
                <Text className="text-base font-bold text-white">−</Text>
              </Pressable>
              <Text className="min-w-[24px] text-center text-sm font-bold text-white">
                {quantity}
              </Text>
              <Pressable
                className="px-3 py-2 active:opacity-70"
                onPress={handleIncrement}
              >
                <Text className="text-base font-bold text-white">+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
