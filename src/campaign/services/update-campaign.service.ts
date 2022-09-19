import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenErrorException } from 'src/common/filters/error-exceptions';
import { Repository } from 'typeorm';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { Campaign } from '../entity/campaign.entity';

@Injectable()
export class UpdateCampaignService {
  private readonly logger = new Logger(UpdateCampaignService.name);
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
  ) {}

  async execute(data: UpdateCampaignDto, brand_id: string, id: string) {
    try {
      const campaignRecord = await this.campaignRepo.findOne({ where: { id } });
      if (campaignRecord.brand_id !== brand_id) {
        throw new ForbiddenErrorException(
          'You are not authorized to perform this action',
        );
      }
      const payload = new UpdateCampaignDto().updateEntity(data);
      await this.campaignRepo.update(id, payload);

      return await this.prepareCampaignResponseData(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async prepareCampaignResponseData(id: string) {
    const data = await this.campaignRepo.findOne({ where: { id } });
    return data;
  }
}
