import { Decimal } from "@prisma/client/runtime/library";

export interface Theater {
  theaterId: number;
  name: string;
  address: string;
  phone_num: string;
  promptpay_num: string;
  latitude: Decimal;
  longitude: Decimal;
}
