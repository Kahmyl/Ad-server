import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestErrorException } from 'src/common/filters/error-exceptions';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from 'src/common/utils/authentication';
import { Repository } from 'typeorm';
import { LoginBrandDto } from '../dto/login-brand.dto';
import { Brand } from '../entity/brand.entity';

@Injectable()
export class LoginBrandService {
  private readonly logger = new Logger(LoginBrandService.name);

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  async execute(data: LoginBrandDto) {
    try {
      const brand = await this.brandRepo.findOne({
        where: {
          email: data.email,
        },
      });

      if (!brand) {
        throw new BadRequestErrorException('Brand does not Exist');
      }

      const passwordMatch = await comparePassword(data.password, brand.password);

      if (!passwordMatch) {
        throw new BadRequestErrorException(
          'Your login credentials are incorrect',
        );
      }

      return await this.prepareBrandResponseData(brand);
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  private async prepareBrandResponseData(brand: Brand) {
    const accessToken = generateAccessToken(brand.id, 'user_access_key');
    const refreshToken = generateRefreshToken(brand.id, 'user_refresh_key');
    const data = new LoginBrandDto().fromEntity(brand);
    return {
      brand: data,
      'access-token': accessToken,
      'refresh-token': refreshToken,
    };
  }
}
