import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { User } from '../entity/user.entity';
import { UserSkillsDto } from './user-skills.dto';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  first_name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(2)
  @IsNotEmpty()
  country_code: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  education_level: string;

  @IsString()
  @IsNotEmpty()
  job_title: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  phone_number: string;

  skills: UserSkillsDto[];

  public toEntity(payload: CreateUserDto) {
    const data = new User();
    data.first_name = payload.first_name;
    data.last_name = payload.last_name;
    data.email = payload.email;
    data.country_code = payload.country_code;
    data.location = payload.location;
    data.job_title = payload.job_title;
    data.education_level = data.education_level;
    data.password = payload.password;
    data.skills = payload.skills;
    if (payload.phone_number) data.phone_number = payload.phone_number;
    return data;
  }

  public fromEntity(payload: User) {
    const data = new User();
    data.id = payload.id;
    data.first_name = payload.first_name;
    data.last_name = payload.last_name;
    data.email = payload.email;
    data.phone_number = payload.phone_number;
    data.country_code = payload.country_code;
    data.location = payload.location;
    data.job_title = payload.job_title;
    data.education_level = data.education_level;
    data.created_at = payload.created_at;
    data.created_at = payload.updated_at;
    return data;
  }
}
