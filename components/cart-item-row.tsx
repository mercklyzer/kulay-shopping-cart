import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { currencyFormatter } from '@/constants/theme';
import type { CartItem } from '@/types/cart';

interface Props {
  item: CartItem;
}

const CartItemRow = ({ item }: Props) => {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <LinearGradient
        colors={item.product.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-14 w-14 items-center justify-center rounded-xl"
      >
        <Text style={{ fontSize: 28 }}>{item.product.emoji}</Text>
      </LinearGradient>

      <View className="flex-1">
        <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
          {item.product.productName}
        </Text>
        <Text className="mt-0.5 text-xs text-gray-500">
          Qty: {item.quantity}
        </Text>
        <Text className="mt-0.5 text-sm font-semibold text-gray-800">
          {currencyFormatter.format(item.product.price * item.quantity)}
        </Text>
      </View>
    </View>
  );
};

export default CartItemRow;
