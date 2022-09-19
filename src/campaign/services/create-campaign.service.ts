import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from '../dto/campaign.dto';
import { Campaign } from '../entity/campaign.entity';

@Injectable()
export class CreateCampaignService {
  private readonly logger = new Logger(CreateCampaignService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
  ) {}

  async execute(data: CreateCampaignDto) {
    try {
      const payload = new CreateCampaignDto().toEntity(data);
      const result = await this.campaignRepo.save(payload);

      return await this.prepareCampaignResponseData(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async prepareCampaignResponseData(campaign: Campaign) {
    const data = new CreateCampaignDto().fromEntity(campaign);
    return data;
  }
}
