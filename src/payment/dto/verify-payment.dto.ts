import {
  IsEnum,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentStatus } from 'src/types';
import { Payment } from '../entity/payment.entity';
import { Transaction } from '../entity/transaction.entity';

export class VerifyPaymentDto {
  @IsEnum([PaymentStatus.SUCCESSFUL, PaymentStatus.PENDING])
  @IsString()
  status: string;

  @IsNumberString()
  app_fee: number;

  @IsOptional()
  @IsNumberString()
  merchant_fee: number;

  @IsOptional()
  @IsString()
  flw_ref: string;

  @IsOptional()
  @IsObject()
  meta: object;

  public updateEntity(payload: VerifyPaymentDto) {
    const data = new Transaction();
    data.transaction_status = payload.status;
    return data;
  }

  public updatePayment(payload: VerifyPaymentDto) {
    const data = new Payment();
    data.payment_status = payload.status;
    data.transaction_fee = payload.app_fee;
    data.merchant_fee = payload.merchant_fee;
    data.metadata = payload.meta;
    data.flutterwave_id = payload.flw_ref;
    return data;
  }
}
