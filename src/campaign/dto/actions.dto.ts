import { IsString, IsNotEmpty } from 'class-validator';
import { Action } from '../entity/actions.entity';

export class ActionsDto {
  @IsString()
  @IsNotEmpty()
  campaign_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  public toEntity(payload: ActionsDto) {
    const data = new Action();
    data.user_id = payload.user_id;
    data.campaign_id = payload.campaign_id;
    return data;
  }
}
