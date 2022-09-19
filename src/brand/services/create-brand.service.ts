import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictErrorException } from 'src/common/filters/error-exceptions';
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from 'src/common/utils/authentication';
import { Repository } from 'typeorm';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entity/brand.entity';

@Injectable()
export class CreateBrandService {
  private readonly logger = new Logger(CreateBrandService.name);
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  async execute(data: CreateBrandDto) {
    try {
      const brandRecord = await this.brandRepo.findOne({
        where: { email: data.email },
      });
      if (brandRecord)
        throw new ConflictErrorException('Account already exist');
      const hashed = await hashPassword(data.password);
      data.password = hashed;

      const payload = new CreateBrandDto().toEntity(data);
      const result = await this.brandRepo.save(payload);

      return await this.prepareBrandResponseData(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async prepareBrandResponseData(brand: Brand) {
    const accessToken = generateAccessToken(brand.id, 'user_access_key');
    const refreshToken = generateRefreshToken(brand.id, 'user_refresh_key');
    const data = new CreateBrandDto().fromEntity(brand);
    return {
      brand: data,
      'access-token': accessToken,
      'refresh-token': refreshToken,
    };
  }
}
