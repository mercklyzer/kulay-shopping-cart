import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { PRIMARY } from '@/constants/theme';

const EmptyCart = () => {
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
        onPress={() => router.push('/(tabs)/shop')}
      >
        <Text className="font-semibold text-white">Browse Products</Text>
      </Pressable>
    </View>
  );
};

export default EmptyCart;
