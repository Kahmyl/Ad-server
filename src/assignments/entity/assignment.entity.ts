import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('assignment')
  export class Assignment {
    @PrimaryGeneratedColumn('uuid')
    @Column({ primary: true, type: 'uuid' })
    id: string;
  
    @Column({ default: 'assignment' })
    object: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }
  