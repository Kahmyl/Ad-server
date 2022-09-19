import { Wallet } from 'src/wallet/entity/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('brand')
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column()
  business_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  country_code: string;

  @Column()
  password: string;

  @OneToOne(() => Wallet, (wallet) => wallet.brand, {
    cascade: ['insert', 'remove'],
    onDelete: 'CASCADE',
  })
  wallet?: Wallet;

  @Column({ default: 'brand' })
  type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
