import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { SUCCESS } from '@/constants/theme';

interface Props {
  voucherCode: string;
  isVoucherValid: boolean;
  onApply: (code: string) => void;
  onClear: () => void;
}

const VoucherSection = ({
  voucherCode,
  isVoucherValid,
  onApply,
  onClear,
}: Props) => {
  const [input, setInput] = useState('');

  const hasInput = input.trim().length > 0;
  const isApplied = voucherCode.length > 0;
  const showInvalidHint =
    isApplied && !isVoucherValid && voucherCode.trim().length > 0;

  const handleApply = () => {
    onApply(input);
  };

  const handleClear = () => {
    onClear();
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

export default VoucherSection;
