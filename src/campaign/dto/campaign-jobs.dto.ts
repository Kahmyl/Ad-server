import { IsUrl, IsString, IsNotEmpty } from 'class-validator';
import { CampaignEducation } from '../entity/campaign-education.entity';
import { CampaignJob } from '../entity/campaign-job.entity';

export class CreateCampaignJobDto {
  @IsString()
  @IsNotEmpty()
  campaign_id: string;

  @IsString()
  @IsNotEmpty()
  target_job_title: string;

  public toEntity(payload: CreateCampaignJobDto) {
    const data = new CampaignJob();
    data.campaign_id = payload.campaign_id;
    data.target_job_title = payload.target_job_title;
    return data;
  }
}
