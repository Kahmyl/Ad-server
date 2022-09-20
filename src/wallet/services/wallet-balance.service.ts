import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/payment/entity/transaction.entity';
import { Repository } from 'typeorm';
import { Wallet } from '../entity/wallet.entity';
import { balanceType } from '../types';

@Injectable()
export class WalletBalanceService {
  private readonly logger = new Logger(WalletBalanceService.name);

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async execute(wallet_id: string) {
    try {
      const actual_balance = await this.transactionRepo
        .createQueryBuilder('transaction')
        .select(
          `SUM(case when transaction_type = 'credit' then amount else 0 end) - SUM(case when transaction_type = 'desk' then amount else 0 end)`,
          'amount',
        )
        .where('transaction.wallet_id = :wallet_id', { wallet_id })
        .andWhere('transaction_status = :status', {
          status: 'successful',
        })
        .getRawOne();

      const desk_balance = await this.transactionRepo
        .createQueryBuilder('transaction')
        .select(
          `SUM(case when transaction_type = 'desk' then amount else 0 end) - SUM(case when transaction_type = 'debit' then amount else 0 end)`,
          'amount',
        )
        .where('transaction.wallet_id = :wallet_id', { wallet_id })
        .andWhere('transaction_status = :status', {
          status: 'successful',
        })
        .getRawOne();

      return {
        actual_balance,
        desk_balance,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
