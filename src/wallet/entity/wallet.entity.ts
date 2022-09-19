
import { Brand } from 'src/brand/entity/brand.entity';
import { Currency } from 'src/types';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  @Column({ primary: true, type: 'uuid' })
  id?: string;

  @Column()
  brand_id: string;

  @OneToOne(() => Brand, (brand) => brand.id)
  @JoinColumn({ name: 'brand_id', referencedColumnName: 'id'})
  brand?: Brand;
  
  // @OneToMany(() => Transaction, transaction => transaction.wallet)
  // @JoinColumn({referencedColumnName: 'wallet_id'})
  // transaction?: Transaction[]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}