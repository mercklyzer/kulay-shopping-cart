import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  type ListRenderItemInfo,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import CartItemRow from '@/components/cart-item-row';
import { currencyFormatter, PRIMARY, SUCCESS } from '@/constants/theme';
import { useCart } from '@/hooks/useCart';
import type { CartItem } from '@/types/cart';

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

const keyExtractor = (item: CartItem) => item.entryId;

const VoucherSection = () => {
  const [input, setInput] = useState('');
  const { dispatch, voucherCode, isVoucherValid } = useCart();

  const hasInput = input.trim().length > 0;
  const isApplied = voucherCode.length > 0;
  const showInvalidHint =
    isApplied && !isVoucherValid && voucherCode.trim().length > 0;

  const handleApply = () => {
    dispatch({ type: 'SET_VOUCHER', code: input });
  };

  const handleClear = () => {
    dispatch({ type: 'SET_VOUCHER', code: '' });
    setInput('');
  };

  return (
    <View className="px-4 pt-4">
      <Text className="mb-2 text-sm font-semibold text-gray-600">
        Voucher Code
      </Text>
      <View className="flex-row gap-3">
        <TextInput
          className="flex-1 rounded-xl border-[1.5px] border-gray-200 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-800"
          style={{ fontFamily: 'Courier New' }}
          placeholder="Enter code"
          placeholderTextColor="#BBB"
          value={input}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          className={`items-center justify-center rounded-xl px-5 active:opacity-70 ${hasInput ? 'bg-gray-900' : 'bg-gray-300'}`}
          onPress={handleApply}
          disabled={!hasInput}
        >
          <Text className="text-sm font-bold text-white">Apply</Text>
        </Pressable>
      </View>
      {isVoucherValid && (
        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="checkmark-circle" size={14} color={SUCCESS} />
            <Text className="text-xs font-semibold" style={{ color: SUCCESS }}>
              {voucherCode} applied — 10% off!
            </Text>
          </View>
          <Pressable onPress={handleClear} className="active:opacity-70">
            <Text className="text-xs font-semibold text-red-400">Remove</Text>
          </Pressable>
        </View>
      )}
      {showInvalidHint && (
        <Text className="mt-2 text-xs font-medium text-red-400">
          Invalid voucher code
        </Text>
      )}
    </View>
  );
};

const OrderSummary = () => {
  const { count, subtotal, isVoucherValid, discountedTotal } = useCart();
  const discountAmount = subtotal - discountedTotal;

  return (
    <View className="mx-4 mt-4 mb-4 rounded-2xl bg-white p-5 shadow-sm">
      <View className="flex-row items-center justify-between py-1">
        <Text className="text-sm font-medium text-gray-500">
          Subtotal ({count} item{count !== 1 ? 's' : ''})
        </Text>
        <Text className="text-sm font-semibold text-gray-900">
          {currencyFormatter.format(subtotal)}
        </Text>
      </View>

      {isVoucherValid && (
        <View className="flex-row items-center justify-between py-1">
          <Text className="text-sm font-medium text-gray-500">
            Voucher (10%)
          </Text>
          <Text className="text-sm font-semibold" style={{ color: SUCCESS }}>
            −{currencyFormatter.format(discountAmount)}
          </Text>
        </View>
      )}

      <View className="mt-2 border-t border-gray-100 pt-3 flex-row items-center justify-between">
        <Text className="text-base font-bold text-gray-900">Total</Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-xl font-extrabold" style={{ color: PRIMARY }}>
            {currencyFormatter.format(discountedTotal)}
          </Text>
          {isVoucherValid && (
            <Text className="text-sm text-gray-400 line-through">
              {currencyFormatter.format(subtotal)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const CartList = () => {
  const { items, dispatch } = useCart();
  const renderItem = ({ item }: ListRenderItemInfo<CartItem>) => (
    <CartItemRow
      item={item}
      onIncrement={() => dispatch({ type: 'ADD', product: item.product })}
      onDecrement={() => dispatch({ type: 'DECREMENT', entryId: item.entryId })}
      onRemove={() => dispatch({ type: 'REMOVE', entryId: item.entryId })}
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

export default function CartScreen() {
  const { items, count } = useCart();

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

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <CartList />
          <VoucherSection />
          <OrderSummary />
        </>
      )}
    </View>
  );
}
