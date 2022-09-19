import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Skill } from '../entity/skills.entity';
export class UserSkillsDto {
  @IsString()
  @IsEmail()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  public toEntity(payload: UserSkillsDto) {
    const data = new Skill();
    data.user_id = payload.user_id;
    data.name = payload.name;
    return data;
  }
}
