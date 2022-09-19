import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Campaign } from './campaign.entity';

@Entity('campaign_skills')
export class CampaignSkill {
  @PrimaryGeneratedColumn('uuid')
  @Column({ primary: true, type: 'uuid' })
  id?: string;

  @Column()
  campaign_id: string;

  @Column()
  target_skill: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.skill)
  @JoinColumn({ name: 'campaign_id' })
  campaign?: Campaign;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
