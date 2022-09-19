import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
  
} from 'typeorm';
import { User } from './user.entity';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  @Column({ primary: true, type: 'uuid' })
  id?: string;

  user_id: string

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.skills)
  @JoinColumn({ name: 'user_id' })
  user?: User;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
