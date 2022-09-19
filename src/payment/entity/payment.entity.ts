import { PaymentPlatform, PaymentStatus } from 'src/types';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  made_by: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'made_by' })
  user?: User;

  @Column()
  base_currency: string;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  narration: string;

  @Column()
  trans_reference: string;

  @Column({ nullable: true })
  flutterwave_id: string;

  @Column({ type: 'float', nullable: true })
  transaction_fee: number;

  @Column({ nullable: true })
  transaction_fee_currency: string;

  @Column({ nullable: true })
  merchant_fee: number;

  @Column({ default: PaymentStatus.PENDING })
  payment_status: string;

  @Column({ type: 'json', nullable: true })
  metadata: object;

  @Column({ default: PaymentPlatform.FLUTTERWAVE })
  platform: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
