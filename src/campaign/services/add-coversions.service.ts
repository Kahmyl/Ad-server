import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockTransactionService } from 'src/wallet/services/mock-transaction.service';
import { Price, TransactionType } from 'src/types';
import { Repository } from 'typeorm';
import { Campaign } from '../entity/campaign.entity';
import { Conversion } from '../entity/conversions.entity';

@Injectable()
export class AddConversionService {
  private readonly logger = new Logger(AddConversionService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
    @InjectRepository(Conversion)
    private readonly conversionRepo: Repository<Conversion>,
    private readonly mockTransaction: MockTransactionService,
  ) {}

  async execute(user_id: string, id: string) {
    try {
      const campaignRecord = await this.campaignRepo.findOne({ where: { id } });
      if (campaignRecord.available_conversions === 0) {
        return null;
      }

      const available_conversions = campaignRecord.available_conversions - 1;
      await this.campaignRepo.update(id, { available_conversions });
      await this.mockTransaction.execute(
        5,
        TransactionType.DESK,
        campaignRecord.brand_id,
        `charge for conversion on ${campaignRecord.name}`,
      );
      await this.conversionRepo.save({ user_id, campaign_id: id });
      return await this.preparedConversionResponse(campaignRecord);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async preparedConversionResponse(campaign: Campaign) {
    return {
      name: campaign.name,
      graphic_url: campaign.graphic_url,
      ad_url: campaign.ad_url,
    };
  }
}
