import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Req,
  Patch,
  Headers,
} from '@nestjs/common';
import {
  CustomRequest,
  successResponse,
  SuccessResponseType,
} from 'src/common/utils/response';
import { AddPaymentDto, ChargeCardDto } from './dto/payment.dto';
import { AddTransanctionDto } from './dto/transaction.dto';
import { ChargeCardService } from './services/charge-payments.service';
import { VerifyPaymentService } from './services/verify-payments.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly chargeCardService: ChargeCardService,
    private readonly verifyPaymentService: VerifyPaymentService,
  ) {}

  @Post('charge')
  @HttpCode(201)
  async cardPayment(
    @Body() data: ChargeCardDto,
    @Body() transData: AddTransanctionDto,
    @Body() payData: AddPaymentDto,
    @Req() req: CustomRequest,
  ): Promise<SuccessResponseType> {
    const response = await this.chargeCardService.execute(
      data,
      transData,
      payData,
      req.user.id,
    );
    return successResponse({
      message: 'Payment is Ongoing',
      code: HttpStatus.OK,
      data: response,
    });
  }

  @Patch('response')
  @HttpCode(200)
  async VerifyPayment(
    @Body() data: any,
    @Headers('verif-hash') secretHash: string,
  ): Promise<SuccessResponseType> {
    const response = await this.verifyPaymentService.execute(data, secretHash);
    return successResponse({
      message: 'Payment has been made',
      code: HttpStatus.OK,
      data: response,
    });
  }
}
