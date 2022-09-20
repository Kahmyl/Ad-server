import { Wallet } from './entity/wallet.entity';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyTokenMiddleware } from '../common/middleware';
import { WalletController } from './wallet.controller';
import { GetWalletService } from './services/get-wallet.service';
import { WalletBalanceService } from './services/wallet-balance.service';
import { Transaction } from 'src/payment/entity/transaction.entity';
import { MockTransactionService } from './services/mock-transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Transaction])],
  controllers: [WalletController],
  providers: [GetWalletService, WalletBalanceService, MockTransactionService],
  exports: [WalletBalanceService, MockTransactionService],
})
export class WalletModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('wallet', 'wallet/balance');
  }
}
