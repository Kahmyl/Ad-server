import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('conversions')
  export class Conversion {
    @PrimaryGeneratedColumn('uuid')
    @Column({ primary: true, type: 'uuid' })
    id?: string;
  
    @Column()
    campaign_id: string;
  
    @Column()
    user_id: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date;
  }
  