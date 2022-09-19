import { IsEmail, IsEnum, IsNumberString, IsString } from 'class-validator';
import { Currency, PaymentPlatform } from '../../types';
import { Payment } from '../entity/payment.entity';

export class ChargeCardDto {
  @IsEnum([Currency.USD])
  @IsString()
  currency: string;

  @IsNumberString()
  amount: number;

  @IsString()
  fullname: string;

  @IsString()
  narration: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  platform: string;
}

export class AddPaymentDto {
  user_id: string;

  @IsEnum([Currency.USD])
  @IsString()
  currency: string;

  @IsNumberString()
  amount: number;

  tx_ref: string;

  @IsString()
  narration: string;

  @IsEnum([PaymentPlatform.FLUTTERWAVE])
  @IsString()
  platform: string;

  public toEntity(payload: AddPaymentDto) {
    const data = new Payment();
    data.made_by = payload.user_id;
    data.base_currency = payload.currency;
    data.amount = payload.amount;
    data.transaction_fee_currency = payload.currency;
    data.trans_reference = payload.tx_ref;
    data.narration = payload.narration;
    data.platform = payload.platform;
    return data;
  }
}
