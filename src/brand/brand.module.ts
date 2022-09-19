import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyTokenMiddleware } from '../common/middleware';
import { BrandController } from './brand.controller';
import { Brand } from './entity/brand.entity';
import { CreateBrandService } from './services/create-brand.service';
import { LoginBrandService } from './services/login-brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandController],
  providers: [CreateBrandService, LoginBrandService],
  exports: [],
})
export class BrandModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('user/profile');
  }
}
