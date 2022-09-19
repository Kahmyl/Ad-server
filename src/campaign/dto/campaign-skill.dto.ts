import { IsString, IsNotEmpty } from 'class-validator';
import { CampaignSkill } from '../entity/campaign-skills.entity';

export class CreateCampaignSkillDto {
  @IsString()
  @IsNotEmpty()
  campaign_id: string;

  @IsString()
  @IsNotEmpty()
  target_skill: string;

  public toEntity(payload: CreateCampaignSkillDto) {
    const data = new CampaignSkill();
    data.campaign_id = payload.campaign_id;
    data.target_skill = payload.target_skill;
    return data;
  }
}
