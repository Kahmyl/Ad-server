import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Brand } from '../entity/brand.entity';

export class LoginBrandDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  public fromEntity(payload: Brand) {
    const data = new Brand();
    data.id = payload.id;
    data.business_name = payload.business_name;
    data.email = payload.email;
    data.created_at = payload.created_at;
    return data;
  }
}
