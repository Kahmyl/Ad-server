import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbconfig } from './config/db';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { CampaignModule } from './campaign/campaign.module';
import { WalletModule } from './wallet/wallet.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    TypeOrmModule.forRoot(dbconfig.getTypeOrmConfig()),
    UserModule,
    BrandModule,
    CampaignModule,
    WalletModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
