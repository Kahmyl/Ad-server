import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockTransactionService } from 'src/wallet/services/mock-transaction.service';
import { Price, TransactionType } from 'src/types';
import { Repository } from 'typeorm';
import { Campaign } from '../entity/campaign.entity';
import { Impression } from '../entity/impressions.entity';

@Injectable()
export class AddImpressionService {
  private readonly logger = new Logger(AddImpressionService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
    @InjectRepository(Impression)
    private readonly impressionRepo: Repository<Impression>,
    private readonly mockTransaction: MockTransactionService,
  ) {}

  async execute(user_id: string, id: string) {
    try {
      const campaignRecord = await this.campaignRepo.findOne({ where: { id } });
      if (campaignRecord.available_impressions === 0) {
        return null;
      }

      const available_impressions = campaignRecord.available_impressions - 1;
      await this.campaignRepo.update(id, { available_impressions });
      await this.mockTransaction.execute(
        1,
        TransactionType.DESK,
        campaignRecord.brand_id,
        `charge for impression on ${campaignRecord.name}`,
      );
      await this.impressionRepo.save({ user_id, campaign_id: id });
      return await this.preparedImpressionResponse(campaignRecord);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async preparedImpressionResponse(campaign: Campaign) {
    return {
      name: campaign.name,
      graphic_url: campaign.graphic_url,
      ad_url: campaign.ad_url,
    };
  }
}
