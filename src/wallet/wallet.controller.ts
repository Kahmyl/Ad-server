import { Controller, Get, HttpStatus, Param, Req } from '@nestjs/common';
import {
  CustomRequest,
  successResponse,
  SuccessResponseType,
} from 'src/common/utils/response';
import { GetWalletService } from './services/get-wallet.service';
import { WalletBalanceService } from './services/wallet-balance.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletBalanceService: WalletBalanceService,
    private readonly getWalletService: GetWalletService,
  ) {}

  @Get()
  async Wallet(@Req() req: CustomRequest): Promise<SuccessResponseType> {
    const result = await this.getWalletService.execute(req.user.id);
    return successResponse({
      message: 'Wallet Fetched Successfully',
      code: HttpStatus.OK,
      data: result,
    });
  }

  @Get('balance/:wallet_id')
  async WalletBalance(
    @Param('wallet_id') wallet_id: string,
    @Req() req: CustomRequest,
  ): Promise<SuccessResponseType> {
    const result = await this.walletBalanceService.execute(wallet_id);
    return successResponse({
      message: 'Wallet Balance Fetched',
      code: HttpStatus.OK,
      data: result,
    });
  }
}
