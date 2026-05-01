import { Text, View } from 'react-native';

import { currencyFormatter, PRIMARY, SUCCESS } from '@/constants/theme';

interface Props {
  count: number;
  subtotal: number;
  isVoucherValid: boolean;
  discountedTotal: number;
}

const OrderSummary = ({
  count,
  subtotal,
  isVoucherValid,
  discountedTotal,
}: Props) => {
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

export default OrderSummary;
