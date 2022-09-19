import { IsUrl, IsString, IsNotEmpty } from 'class-validator';
import { Campaign } from '../entity/campaign.entity';
import { CreateCampaignEducationDto } from './campaign-education.dto';
import { CreateCampaignJobDto } from './campaign-jobs.dto';
import { CreateCampaignLocationDto } from './campaign-locations.dto';
import { CreateCampaignSkillDto } from './campaign-skill.dto';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  graphic_url: string;

  @IsString()
  @IsUrl()
  ad_url: string;

  brand_id: string;

  target_location: CreateCampaignLocationDto[];

  target_education_level: CreateCampaignEducationDto[];

  target_job_title: CreateCampaignJobDto[];

  target_skill: CreateCampaignSkillDto[];

  public toEntity(payload: CreateCampaignDto) {
    const data = new Campaign();
    data.brand_id = payload.brand_id;
    data.name = payload.name;
    data.graphic_url = payload.graphic_url;
    data.ad_url = payload.ad_url;
    data.education = payload.target_education_level;
    data.location = payload.target_location;
    data.job = payload.target_job_title;
    data.skill = payload.target_skill;
    return data;
  }

  public fromEntity(payload: Campaign) {
    const data = new Campaign();
    data.id = payload.id;
    data.brand_id = payload.brand_id;
    data.name = payload.name;
    data.graphic_url = payload.graphic_url;
    data.ad_url = payload.ad_url;
    data.created_at = payload.created_at;
    data.created_at = payload.updated_at;
    return data;
  }
}
