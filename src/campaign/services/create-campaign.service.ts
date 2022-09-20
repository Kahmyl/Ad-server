import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnprocessableEntityErrorException } from 'src/common/filters/error-exceptions';
import { MockTransactionService } from 'src/wallet/services/mock-transaction.service';
import { Price, TransactionType } from 'src/types';
import { Wallet } from 'src/wallet/entity/wallet.entity';
import { WalletBalanceService } from 'src/wallet/services/wallet-balance.service';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from '../dto/campaign.dto';
import { Campaign } from '../entity/campaign.entity';

@Injectable()
export class CreateCampaignService {
  private readonly logger = new Logger(CreateCampaignService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
    private readonly walletBalance: WalletBalanceService,
    private readonly mockTransaction: MockTransactionService,
  ) {}

  async execute(data: CreateCampaignDto) {
    try {
      const payload = new CreateCampaignDto().toEntity(data);
      const { brand_id } = payload;
      const wallet = await this.walletRepo.findOne({ where: { brand_id } });
      const { actual_balance } = await this.walletBalance.execute(wallet.id);
      if (actual_balance.amount < Price) {
        throw new UnprocessableEntityErrorException(
          'Insufficient Funds in wallet',
        );
      }
      await this.mockTransaction.execute(
        Price,
        TransactionType.DESK,
        brand_id,
        `funding ${payload.name}`,
      );
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
