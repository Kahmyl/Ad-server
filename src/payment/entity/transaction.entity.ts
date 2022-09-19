import { PaymentStatus } from 'src/types';
import { User } from 'src/user/entity/user.entity';
import { Wallet } from 'src/wallet/entity/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  trans_reference: string;

  @Column({ type: 'uuid' })
  made_by: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'made_by' })
  user?: User;

  @Column()
  wallet_id: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.id)
  @JoinColumn({ name: 'wallet_id' })
  wallet?: Wallet;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  currency: string;

  @Column()
  narration: string;

  @Column({ default: PaymentStatus.PENDING })
  transaction_status: string;

  @Column({})
  transaction_type: string;

  @Column({ type: 'uuid', nullable: true })
  last_transaction_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
