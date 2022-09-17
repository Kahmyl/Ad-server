import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('report')
  export class Report {
    @PrimaryGeneratedColumn('uuid')
    @Column({ primary: true, type: 'uuid' })
    id: string;

    @Column()
    impressions: number

    @Column()
    clicks: number
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }
  