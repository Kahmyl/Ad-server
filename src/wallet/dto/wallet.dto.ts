import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Wallet } from '../entity/wallet.entity';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  brand_id: string;

  public toEntity(payload: CreateWalletDto) {
    const data = new Wallet();
    data.brand_id = payload.brand_id;
    return data;
  }

  public fromEntity(payload: Wallet) {
    const data = new Wallet();
    data.id = payload.id;
    data.brand_id = payload.brand_id;
    return data;
  }
}

export class WalletQuery {
  @IsOptional()
  @IsString()
  transFilter: string;
}
