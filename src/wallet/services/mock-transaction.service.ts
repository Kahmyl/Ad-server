import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../payment/entity/transaction.entity';
import { v4 } from 'uuid';
import { Wallet } from 'src/wallet/entity/wallet.entity';
import { Currency } from 'src/types';

@Injectable()
export class MockTransactionService {
  private readonly logger = new Logger(MockTransactionService.name);
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
  ) {}

  async execute(
    amount: number,
    transaction_type: string,
    brand_id: string,
    narration: string,
  ) {
    try {
      const tx_ref = v4() as string;
      const wallet = await this.walletRepo.findOne({ where: { brand_id } });
      const transactionRecord = await this.transactionRepo.findOne({
        where: {
          made_by: brand_id,
          wallet_id: wallet.id,
        },
        order: { created_at: 'DESC' },
      });

      const data = new Transaction();
      data.made_by = brand_id;
      data.trans_reference = tx_ref;
      data.wallet_id = wallet.id;
      data.amount = amount;
      data.currency = Currency.USD;
      data.narration = narration;
      data.transaction_type = transaction_type;
      if (transactionRecord) {
        data.last_transaction_id = transactionRecord.id;
      }

      await this.transactionRepo.save(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
