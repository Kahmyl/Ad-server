import { IsUrl, IsString, IsNotEmpty } from 'class-validator';
import { CampaignEducation } from '../entity/campaign-education.entity';

export class CreateCampaignEducationDto {
  @IsString()
  @IsNotEmpty()
  campaign_id: string;

  @IsString()
  @IsNotEmpty()
  target_education_level: string;

  public toEntity(payload: CreateCampaignEducationDto) {
    const data = new CampaignEducation();
    data.campaign_id = payload.campaign_id;
    data.target_education_level = payload.target_education_level;
    return data;
  }
}
