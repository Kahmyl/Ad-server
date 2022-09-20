import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockTransactionService } from 'src/wallet/services/mock-transaction.service';
import { Price, TransactionType } from 'src/types';
import { Repository } from 'typeorm';
import { ActionsDto } from '../dto/actions.dto';
import { Action } from '../entity/actions.entity';
import { Campaign } from '../entity/campaign.entity';

@Injectable()
export class AddActionService {
  private readonly logger = new Logger(AddActionService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
    @InjectRepository(Action)
    private readonly actionRepo: Repository<Action>,
    private readonly mockTransaction: MockTransactionService,
  ) {}

  async execute(user_id: string, id: string) {
    try {
      const campaignRecord = await this.campaignRepo.findOne({ where: { id } });
      if (campaignRecord.available_actions === 0) {
        return null;
      }

      const available_actions = campaignRecord.available_actions - 1;
      await this.campaignRepo.update(id, { available_actions });
      await this.mockTransaction.execute(
        2,
        TransactionType.DESK,
        campaignRecord.brand_id,
        `charge for action on ${campaignRecord.name}`,
      );
      await this.actionRepo.save({ user_id, campaign_id: id });
      return await this.preparedActionResponse(campaignRecord);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async preparedActionResponse(campaign: Campaign) {
    return {
      name: campaign.name,
      graphic_url: campaign.graphic_url,
      ad_url: campaign.ad_url,
    };
  }
}
