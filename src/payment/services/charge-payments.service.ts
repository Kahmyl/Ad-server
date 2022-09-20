import { Injectable, Logger } from '@nestjs/common';
const open = require('open');
import { v4 } from 'uuid';
import axios from 'axios';
import { AddPaymentDto, ChargeCardDto } from '../dto/payment.dto';
import { AddTransanctionDto } from '../dto/transaction.dto';
import { getManager } from 'typeorm';
import { flw } from '../api';
import { Transaction } from '../entity/transaction.entity';
import { Payment } from '../entity/payment.entity';

@Injectable()
export class ChargeCardService {
  private readonly logger = new Logger(ChargeCardService.name);
  async execute(
    payload: ChargeCardDto,
    transData: AddTransanctionDto,
    payData: AddPaymentDto,
    id: string,
  ) {
    try {
      const response = await getManager().transaction(async (manager) => {
        try {
          const tx_ref = v4();
          const transPayload = new AddTransanctionDto().toEntity(transData);
          let data = {
            tx_ref,
            amount: payload.amount,
            currency: payload.currency,
            redirect_url: flw.redirect_url,
            naration: payload.narration,
            customer: {
              email: payload.email,
              phonenumber: payload.phone_number,
              name: payload.fullname,
            },
            customizations: flw.customizations,
          };

          const response = await axios.post(flw.url, data, {
            headers: flw.headers,
          });

          //Adding the transactions to the DB
          transPayload.made_by = id;
          const transactionRecord = await manager
            .getRepository(Transaction)
            .findOne({
              where: {
                made_by: transPayload.made_by,
                wallet_id: transPayload.wallet_id,
              },
              order: { created_at: 'DESC' },
            });
          if (transactionRecord) {
            transPayload.last_transaction_id = transactionRecord.id;
          }
          transPayload.trans_reference = tx_ref;
          await manager.getRepository(Transaction).save(transPayload);

          //Adding the payment response to the payment table
          const payPayload = new AddPaymentDto().toEntity(payData);
          payPayload.made_by = id;
          payPayload.trans_reference = tx_ref;
          await manager.getRepository(Payment).save(payPayload);

          open(response.data.url);

          return response.data;
        } catch (error) {
          this.logger.error(error);
          throw error;
        }
      });
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
