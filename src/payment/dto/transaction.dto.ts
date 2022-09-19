import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { TransactionType } from 'src/types';
import { Transaction } from '../entity/transaction.entity';

export class AddTransanctionDto {
  trans_reference: string;

  user_id: string;

  @IsString()
  @IsNotEmpty()
  wallet_id: string;

  @IsNumberString()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  narration: string;

  @IsEnum([
    TransactionType.CREDIT,
    TransactionType.DEBIT,
  ])
  @IsString()
  transaction_type: string;

  @IsOptional()
  @IsString()
  last_transaction_id: string;

  public toEntity(payload: AddTransanctionDto) {
    const data = new Transaction();
    data.trans_reference = payload.trans_reference;
    data.made_by = payload.user_id;
    data.wallet_id = payload.wallet_id;
    data.amount = payload.amount;
    data.currency = payload.currency;
    data.narration = payload.narration;
    data.transaction_type = payload.transaction_type;
    if (payload.last_transaction_id)
      data.last_transaction_id = payload.last_transaction_id;
    return data;
  }
}
