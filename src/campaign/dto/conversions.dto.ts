import { IsString, IsNotEmpty } from 'class-validator';
import { Action } from '../entity/actions.entity';
import { Conversion } from '../entity/conversions.entity';
import { Impression } from '../entity/impressions.entity';

export class ConversionsDto {
  @IsString()
  @IsNotEmpty()
  campaign_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  public toEntity(payload: ConversionsDto) {
    const data = new Conversion();
    data.user_id = payload.user_id;
    data.campaign_id = payload.campaign_id;
    return data;
  }
}
