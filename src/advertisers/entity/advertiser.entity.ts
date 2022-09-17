import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('advertiser')
  export class Advertiser {
    @PrimaryGeneratedColumn('uuid')
    @Column({ primary: true, type: 'uuid' })
    id: string;
  
    @Column({ default: 'advertiser' })
    object: string;
  
    @Column()
    name: string;

    //Campaign
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }
  