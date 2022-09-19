import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { User } from '../entity/user.entity';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  public fromEntity(payload: User) {
    const data = new User();
    data.id = payload.id;
    data.first_name = payload.first_name;
    data.last_name = payload.last_name;
    data.email = payload.email;
    data.created_at = payload.created_at;
    return data;
  }
}
