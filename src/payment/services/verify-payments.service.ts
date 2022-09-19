import { Injectable, Logger } from '@nestjs/common';
import { getManager } from 'typeorm';
import {
  FLUTTERWAVE_PUBLIC_KEY,
  FLUTTERWAVE_SECRET_KEY,
  FLUTTERWAVE_WEBHOOK_HASH,
} from 'src/config/keys';
import { VerifyPaymentDto } from '../dto/verify-payment.dto';
const Flutterwave = require('flutterwave-node-v3');
import {
  ConflictErrorException,
  ForbiddenErrorException,
} from 'src/common/filters/error-exceptions';
import { Payment } from '../entity/payment.entity';

import { PaymentPlatform } from 'src/types';
import { Transaction } from '../entity/transaction.entity';

@Injectable()
export class VerifyPaymentService {
  private readonly logger = new Logger(VerifyPaymentService.name);
  flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_SECRET_KEY);
  async execute(payload, secretHash) {
    try {
      await getManager().transaction(async (manager) => {
        try {
          if (secretHash !== FLUTTERWAVE_WEBHOOK_HASH) {
            throw new ForbiddenErrorException('error verifying hash');
          }
          //checking duplicate transaction conflict
          const transactionRecord = await manager
            .getRepository(Transaction)
            .findOne({
              where: {
                trans_reference: payload.data.tx_ref,
              },
            });

          if (transactionRecord.transaction_status === payload.data.status) {
            throw new ConflictErrorException('Duplicate Transaction');
          }

          //Verifying Transaction status
          const response = await this.flw.Transaction.verify({
            id: payload.data.id,
          });

          if (
            response.data.status === 'successful' &&
            response.data.amount === transactionRecord.amount
          ) {
            //updating transaction status in DB
            const payload2 = new VerifyPaymentDto().updateEntity(response.data);
            payload2.transaction_status = payload.data.status;
            const id = transactionRecord.id;
            await manager.getRepository(Transaction).update(id, payload2);

            //Updating payment status in DB
            const paymentPayload = new VerifyPaymentDto().updatePayment(
              response.data,
            );
            paymentPayload.payment_status = payload.data.status;
            await manager
              .getRepository(Payment)
              .update({ trans_reference: payload.data.tx_ref }, paymentPayload);

            return response.data.status;
          }
        } catch (error) {
          this.logger.error(error);
        }
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
