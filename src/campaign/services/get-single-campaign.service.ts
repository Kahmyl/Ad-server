import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../entity/campaign.entity';

@Injectable()
export class GetSingleCampaignService {
  private readonly logger = new Logger(GetSingleCampaignService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
  ) {}

  async execute(brand_id: string, id: string) {
    try {
      const result = await this.campaignRepo
        .createQueryBuilder('campaign')
        .leftJoinAndSelect('campaign.campaign_education', 'education')
        .leftJoinAndSelect('campaign.campaign_jobs', 'jobs')
        .leftJoinAndSelect('campaign.campaign_locations', ',locations')
        .leftJoinAndSelect('campaign.campaign_skills', ',skills')
        .where('campaign.brand_id = :brand_id', { brand_id })
        .andWhere('campaign.id = :id', { id })
        .getOne();
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
