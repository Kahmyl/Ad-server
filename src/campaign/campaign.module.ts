import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyTokenMiddleware } from '../common/middleware';
import { CampaignController } from './campaign.controller';
import { Campaign } from './entity/campaign.entity';
import { CreateCampaignService } from './services/create-campaign.service';
import { DeleteCampaignService } from './services/delete-campaign.service';
import { GetAllCampaignService } from './services/get-all-campaigns.service';
import { GetSingleCampaignService } from './services/get-single-campaign.service';
import { UpdateCampaignService } from './services/update-campaign.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignController],
  providers: [
    CreateCampaignService,
    GetAllCampaignService,
    GetSingleCampaignService,
    UpdateCampaignService,
    DeleteCampaignService,
  ],
  exports: [],
})
export class BrandModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes(
        'campaign/create',
        'campaign',
        'campaign/:id',
        'campaign/update/:id',
        'campaign/delete/:id',
      );
  }
}
