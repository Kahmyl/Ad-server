import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenErrorException } from 'src/common/filters/error-exceptions';
import { Repository } from 'typeorm';
import { Campaign } from '../entity/campaign.entity';

@Injectable()
export class DeleteCampaignService {
  private readonly logger = new Logger(DeleteCampaignService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
  ) {}

  async execute(brand_id: string, id: string) {
    try {
      const campaignRecord = await this.campaignRepo.findOne({ where: { id } });
      if (campaignRecord.brand_id !== brand_id) {
        throw new ForbiddenErrorException(
          'You are not authorized to perform this action',
        );
      }
      await this.campaignRepo.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
