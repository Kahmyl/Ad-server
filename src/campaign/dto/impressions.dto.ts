import { IsString, IsNotEmpty } from 'class-validator';
import { Action } from '../entity/actions.entity';
import { Impression } from '../entity/impressions.entity';

export class ImpressionsDto {
  @IsString()
  @IsNotEmpty()
  campaign_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  public toEntity(payload: ImpressionsDto) {
    const data = new Impression();
    data.user_id = payload.user_id;
    data.campaign_id = payload.campaign_id;
    return data;
  }
}
