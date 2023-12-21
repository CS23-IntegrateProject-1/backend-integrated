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

export interface RecievedTheater {
  theaterId: number;
  name: string;
  address: string;
  phoneNum: string;
  promptPayNum: string;
  latitude: Decimal;
  longitude: Decimal;
}
