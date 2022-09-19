import { IsString, IsNotEmpty } from 'class-validator';
import { CampaignLocation } from '../entity/campaign-locations.entity';

export class CreateCampaignLocationDto {
  @IsString()
  @IsNotEmpty()
  campaign_id: string;

  @IsString()
  @IsNotEmpty()
  target_location: string;

  public toEntity(payload: CreateCampaignLocationDto) {
    const data = new CampaignLocation();
    data.campaign_id = payload.campaign_id;
    data.target_location = payload.target_location;
    return data;
  }
}
