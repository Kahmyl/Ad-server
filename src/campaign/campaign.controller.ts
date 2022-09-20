import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  CustomRequest,
  successResponse,
  SuccessResponseType,
} from 'src/common/utils/response';
import { CreateCampaignDto } from './dto/campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { AddActionService } from './services/add-actions.service';
import { AddImpressionService } from './services/add-impressions.service';
import { CreateCampaignService } from './services/create-campaign.service';
import { DeleteCampaignService } from './services/delete-campaign.service';
import { GetAllCampaignService } from './services/get-all-campaigns.service';
import { GetConsumerCampaignService } from './services/get-consumer-campaign.service';
import { GetSingleCampaignService } from './services/get-single-campaign.service';
import { UpdateCampaignService } from './services/update-campaign.service';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly createCampaignService: CreateCampaignService,
    private readonly getAllCampaignService: GetAllCampaignService,
    private readonly getSingleCampaignService: GetSingleCampaignService,
    private readonly updateCampaignService: UpdateCampaignService,
    private readonly deleteCampaignService: DeleteCampaignService,
    private readonly getConsumerCampaignService: GetConsumerCampaignService,
    private readonly addActionService: AddActionService,
    private readonly addConversionService: AddActionService,
    private readonly addImpressionService: AddImpressionService,
  ) {}

  @Post('create')
  @HttpCode(201)
  async createCampaign(
    @Body() data: CreateCampaignDto,
    @Req() req: CustomRequest,
  ): Promise<SuccessResponseType> {
    data.brand_id = req.user.id;
    const result = await this.createCampaignService.execute(data);
    return successResponse({
      message: 'Campaign created successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Get()
  @HttpCode(200)
  async getCampaign(@Req() req: CustomRequest): Promise<SuccessResponseType> {
    const result = await this.getAllCampaignService.execute(req.user.id);
    return successResponse({
      message: 'Campaign fetched successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Get('consumer')
  @HttpCode(200)
  async getConsumerCampaign(
    @Req() req: CustomRequest,
  ): Promise<SuccessResponseType> {
    const result = await this.getConsumerCampaignService.execute(req.user.id);
    return successResponse({
      message: 'Campaign fetched successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Get(':id')
  @HttpCode(200)
  async getSingleCampaign(
    @Req() req: CustomRequest,
    @Param() id: string,
  ): Promise<SuccessResponseType> {
    const result = await this.getSingleCampaignService.execute(req.user.id, id);
    return successResponse({
      message: 'Campaign fetched successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Patch('update/:id')
  @HttpCode(200)
  async updateCampaign(
    @Body() data: UpdateCampaignDto,
    @Req() req: CustomRequest,
    @Param() id: string,
  ): Promise<SuccessResponseType> {
    const result = await this.updateCampaignService.execute(
      data,
      req.user.id,
      id,
    );
    return successResponse({
      message: 'Campaign updated successfully',
      data: result,
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Delete('delete/:id')
  @HttpCode(200)
  async deleteCampaign(
    @Req() req: CustomRequest,
    @Param() id: string,
  ): Promise<SuccessResponseType> {
    await this.deleteCampaignService.execute(req.user.id, id);
    return successResponse({
      message: 'Campaign deleted successfully',
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Patch('action/:id')
  @HttpCode(200)
  async addAction(
    @Req() req: CustomRequest,
    @Param() id: string,
  ): Promise<SuccessResponseType> {
    await this.addActionService.execute(req.user.id, id);
    return successResponse({
      message: 'Action initiated successfully',
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Patch('coversion/:id')
  @HttpCode(200)
  async addConversion(
    @Req() req: CustomRequest,
    @Param() id: string,
  ): Promise<SuccessResponseType> {
    await this.addConversionService.execute(req.user.id, id);
    return successResponse({
      message: 'Conversion initiated successfully',
      code: HttpStatus.OK,
      status: 'success',
    });
  }

  @Patch('impression/:id')
  @HttpCode(200)
  async addImpression(
    @Req() req: CustomRequest,
    @Param() id: string,
  ): Promise<SuccessResponseType> {
    await this.addImpressionService.execute(req.user.id, id);
    return successResponse({
      message: 'Impression initiated successfully',
      code: HttpStatus.OK,
      status: 'success',
    });
  }
}
