import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyTokenMiddleware } from '../common/middleware';
import { Payment } from './entity/payment.entity';
import { Transaction } from './entity/transaction.entity';
import { PaymentController } from './payment.controller';
import { ChargeCardService } from './services/charge-payments.service';
import { VerifyPaymentService } from './services/verify-payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Transaction])],
  controllers: [PaymentController],
  providers: [ChargeCardService, VerifyPaymentService],
  exports: [],
})
export class PaymentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('payment/charge');
  }
}
