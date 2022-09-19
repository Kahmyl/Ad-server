import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Skill } from './skills.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column()
  country_code: string;

  @Column()
  location: string;

  @Column()
  job_title: string;

  @Column()
  education_level: string;

  @OneToMany(() => Skill, (skill) => skill.user, {
    cascade: ['insert', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'user_id' })
  skills?: Skill[];

  @Column({ default: 'consumer' })
  type: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
