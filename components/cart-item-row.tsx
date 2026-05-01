import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { currencyFormatter } from '@/constants/theme';
import type { CartItem } from '@/types/cart';

interface Props {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartItemRow = ({ item, onIncrement, onDecrement, onRemove }: Props) => {
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
        <Text className="mt-0.5 text-sm font-semibold text-gray-800">
          {currencyFormatter.format(item.product.price)}
        </Text>
      </View>

      <View
        className="flex-row items-center overflow-hidden rounded-xl"
        style={{ backgroundColor: item.product.buttonColor }}
      >
        <Pressable
          className="px-3 py-2 active:opacity-70"
          onPress={onDecrement}
        >
          <Text className="text-base font-bold text-white">−</Text>
        </Pressable>
        <Text className="min-w-[24px] text-center text-sm font-bold text-white">
          {item.quantity}
        </Text>
        <Pressable
          className="px-3 py-2 active:opacity-70"
          onPress={onIncrement}
        >
          <Text className="text-base font-bold text-white">+</Text>
        </Pressable>
      </View>

      <DeleteItemRow onRemove={onRemove} />
    </View>
  );
};

const DeleteItemRow = ({ onRemove }: { onRemove: () => void }) => (
  <Pressable onPress={onRemove} className="p-1 active:opacity-50">
    <Ionicons name="trash-outline" size={18} color="#EF4444" />
  </Pressable>
);

export default CartItemRow;
