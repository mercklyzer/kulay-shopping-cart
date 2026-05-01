export interface Voucher {
  code: string;
  discount: number;
}

export const VOUCHERS: Voucher[] = [{ code: 'discount10', discount: 0.1 }];
