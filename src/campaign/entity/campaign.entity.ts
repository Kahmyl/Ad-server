import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CampaignEducation } from './campaign-education.entity';
import { CampaignJob } from './campaign-job.entity';
import { CampaignLocation } from './campaign-locations.entity';
import { CampaignSkill } from './campaign-skills.entity';

@Entity('campaign')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column()
  brand_id: string;

  @Column()
  name: string;

  @Column()
  graphic_url: string;

  @Column()
  ad_url: string;

  @Column({ default: 100 })
  available_impressions: number;

  @Column({ default: 50 })
  available_actions: number;

  @Column({ default: 50 })
  available_conversions: number;

  @OneToMany(() => CampaignEducation, (education) => education.campaign, {
    cascade: ['insert', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'campaign_id' })
  education?: CampaignEducation[];

  @OneToMany(() => CampaignJob, (job) => job.campaign, {
    cascade: ['insert', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'campaign_id' })
  job?: CampaignJob[];

  @OneToMany(() => CampaignLocation, (location) => location.campaign, {
    cascade: ['insert', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'campaign_id' })
  location?: CampaignLocation[];

  @OneToMany(() => CampaignSkill, (skill) => skill.campaign, {
    cascade: ['insert', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'campaign_id' })
  skill?: CampaignSkill[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
