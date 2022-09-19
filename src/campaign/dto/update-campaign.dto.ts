import { IsUrl, IsString, IsOptional } from 'class-validator';
import { Campaign } from '../entity/campaign.entity';
export class UpdateCampaignDto {
  @IsString()
  @IsOptional()
  graphic_url: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  ad_url: string;

  public updateEntity(payload: UpdateCampaignDto) {
    const data = new Campaign();
    if (this.graphic_url) data.graphic_url = payload.graphic_url;
    if (this.ad_url) data.ad_url = payload.ad_url;
    return data;
  }
}
