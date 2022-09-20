import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/payment/entity/transaction.entity';
import { User } from 'src/user/entity/user.entity';
import { Wallet } from 'src/wallet/entity/wallet.entity';
import { WalletModule } from 'src/wallet/wallet.module';
import { VerifyTokenMiddleware } from '../common/middleware';
import { CampaignController } from './campaign.controller';
import { Action } from './entity/actions.entity';
import { Campaign } from './entity/campaign.entity';
import { Conversion } from './entity/conversions.entity';
import { Impression } from './entity/impressions.entity';
import { AddActionService } from './services/add-actions.service';
import { AddConversionService } from './services/add-coversions.service';
import { AddImpressionService } from './services/add-impressions.service';
import { CreateCampaignService } from './services/create-campaign.service';
import { DeleteCampaignService } from './services/delete-campaign.service';
import { GetAllCampaignService } from './services/get-all-campaigns.service';
import { GetConsumerCampaignService } from './services/get-consumer-campaign.service';
import { GetSingleCampaignService } from './services/get-single-campaign.service';
import { UpdateCampaignService } from './services/update-campaign.service';

@Module({
  imports: [
    WalletModule,
    TypeOrmModule.forFeature([
      Campaign,
      Wallet,
      User,
      Action,
      Impression,
      Conversion,
      Transaction,
    ]),
  ],
  controllers: [CampaignController],
  providers: [
    CreateCampaignService,
    GetAllCampaignService,
    GetSingleCampaignService,
    UpdateCampaignService,
    DeleteCampaignService,
    GetConsumerCampaignService,
    AddActionService,
    AddConversionService,
    AddImpressionService,
  ],
  exports: [],
})
export class CampaignModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes(
        'campaign/create',
        'campaign',
        'campaign/:id',
        'campaign/update/:id',
        'campaign/delete/:id',
        'campaign/consumer',
        'campaign/action/:id',
        'campaign/conversion/:id',
        'campaign/impression/:id',
      );
  }
}
