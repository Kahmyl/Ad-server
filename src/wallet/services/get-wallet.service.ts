import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entity/wallet.entity';

@Injectable()
export class GetWalletService {
  private readonly logger = new Logger(GetWalletService.name);

  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
  ) {}

  async execute(user_id: string) {
    try {
      const result = await this.walletRepo
        .createQueryBuilder('wallet')
        .leftJoinAndSelect('wallet.transaction', 'transaction')
        .where('wallet.user_id = :user_id', { user_id })
        .getOne();

      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
