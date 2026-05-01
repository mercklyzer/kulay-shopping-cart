import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CartList from '@/components/cart/CartList';
import EmptyCart from '@/components/cart/EmptyCart';
import OrderSummary from '@/components/cart/OrderSummary';
import VoucherSection from '@/components/cart/VoucherSection';
import { useCart } from '@/hooks/useCart';

export default function CartScreen() {
  const {
    items,
    count,
    subtotal,
    voucherCode,
    isVoucherValid,
    discountedTotal,
    dispatch,
  } = useCart();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pb-4">
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
        <EmptyCart />
      ) : (
        <>
          <CartList
            items={items}
            onIncrement={(product) => dispatch({ type: 'ADD', product })}
            onDecrement={(entryId) => dispatch({ type: 'DECREMENT', entryId })}
            onRemove={(entryId) => dispatch({ type: 'REMOVE', entryId })}
          />
          <VoucherSection
            voucherCode={voucherCode}
            isVoucherValid={isVoucherValid}
            onApply={(code) => dispatch({ type: 'SET_VOUCHER', code })}
            onClear={() => dispatch({ type: 'SET_VOUCHER', code: '' })}
          />
          <OrderSummary
            count={count}
            subtotal={subtotal}
            isVoucherValid={isVoucherValid}
            discountedTotal={discountedTotal}
          />
        </>
      )}
    </SafeAreaView>
  );
}
