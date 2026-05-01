import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { PRIMARY } from '@/constants/theme';

export default function ShopScreen() {
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
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400">Products coming soon</Text>
      </View>
    </View>
  );
}
