import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Campaign } from '../entity/campaign.entity';

@Injectable()
export class GetConsumerCampaignService {
  private readonly logger = new Logger(GetConsumerCampaignService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(user_id: string) {
    try {
      const user = await this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.skills', 'skills')
        .where('user.id = :user_id', { user_id })
        .getOne();

      const { education_level, location, job_title, skills } = user;

      const result = await this.campaignRepo
        .createQueryBuilder('campaign')
        .leftJoinAndSelect('campaign.campaign_education', 'education')
        .leftJoinAndSelect('campaign.campaign_jobs', 'jobs')
        .leftJoinAndSelect('campaign.campaign_locations', ',locations')
        .leftJoinAndSelect('campaign.campaign_skills', ',skills')
        .where('education.target_education_level = :education_level', {
          education_level,
        })
        .andWhere('locations.target_location = :location', { location })
        .andWhere('jobs.target_job_title = :job_title', { job_title })
        .andWhere('skills.target_skill IN (:skills)', { skills })
        .getMany();

      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
