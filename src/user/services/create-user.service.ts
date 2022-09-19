import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictErrorException,
} from 'src/common/filters/error-exceptions';
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from 'src/common/utils/authentication';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(data: CreateUserDto) {
    try {
      const userRecord = await this.userRepo.findOne({
        where: { email: data.email },
      });
      if (userRecord) throw new ConflictErrorException('Account already exist');
      const hashed = await hashPassword(data.password);
      data.password = hashed;

      const payload = new CreateUserDto().toEntity(data);
      const result = await this.userRepo.save(payload);

      return await this.prepareUserResponseData(result);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async prepareUserResponseData(user: User) {
    const accessToken = generateAccessToken(user.id, 'user_access_key');
    const refreshToken = generateRefreshToken(user.id, 'user_refresh_key');
    const data = new CreateUserDto().fromEntity(user);
    return {
      user: data,
      'access-token': accessToken,
      'refresh-token': refreshToken,
    };
  }
}
