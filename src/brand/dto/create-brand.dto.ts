import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { CreateWalletDto } from 'src/wallet/dto/wallet.dto';
import { Brand } from '../entity/brand.entity';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  business_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(2)
  @IsNotEmpty()
  country_code: string;

  @IsString()
  @MinLength(6)
  password: string;

  wallet: CreateWalletDto;

  public toEntity(payload: CreateBrandDto) {
    const data = new Brand();
    data.business_name = payload.business_name;
    data.email = payload.email;
    data.country_code = payload.country_code;
    data.password = payload.password;
    data.wallet = payload.wallet;
    return data;
  }

  public fromEntity(payload: Brand) {
    const data = new Brand();
    data.id = payload.id;
    data.business_name = payload.business_name;
    data.email = payload.email;
    data.country_code = payload.country_code;
    data.created_at = payload.created_at;
    data.created_at = payload.updated_at;
    return data;
  }
}
