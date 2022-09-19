import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestErrorException } from 'src/common/filters/error-exceptions';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from 'src/common/utils/authentication';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login-user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class LoginUserService {
  private readonly logger = new Logger(LoginUserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(data: LoginDto) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new BadRequestErrorException('User does not Exist');
      }

      const passwordMatch = await comparePassword(data.password, user.password);

      if (!passwordMatch) {
        throw new BadRequestErrorException(
          'Your login credentials are incorrect',
        );
      }

      return await this.prepareUserResponseData(user);
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  private async prepareUserResponseData(user: User) {
    const accessToken = generateAccessToken(user.id, 'user_access_key');
    const refreshToken = generateRefreshToken(user.id, 'user_refresh_key');
    const data = new LoginDto().fromEntity(user);
    return {
      user: data,
      'access-token': accessToken,
      'refresh-token': refreshToken,
    };
  }
}
