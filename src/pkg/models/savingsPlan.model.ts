import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import Model from './entity.model';
import SavingsInvitation from './invitation.model';
import User from './user.model';

export enum SavingsPlanType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
}

export enum SavingsPlanFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export enum SavingsPlanDuration {
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  ONE_YEAR = 'ONE_YEAR',
}

@Entity('savings_plans')
export default class SavingsPlan extends Model {
  @Column()
  title!: string;

  @Column()
  type!: SavingsPlanType;

  @Column()
  amount!: number;

  @Column({
    type: 'enum',
    enum: SavingsPlanFrequency,
  })
  frequency!: SavingsPlanFrequency;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @ManyToOne(() => User, (user) => user.savingsPlans)
  user!: User;

  @Column()
  userId!: string;

  @Column()
  numberOfBuddies!: number;

  @Column({
    type: 'enum',
    enum: SavingsPlanDuration,
  })
  duration!: SavingsPlanDuration;

  //members and memberIds are the same thing
  @ManyToMany(() => User)
  @JoinTable()
  members!: User[];

  @Column({ type: 'simple-array', nullable: true })
  memberIds!: string[];

  @Column()
  relationship!: string;

  @OneToMany(() => SavingsInvitation, (savingsInvitation) => savingsInvitation.savingsPlan)
  savingsInvitations!: SavingsInvitation[];

  toJSON() {
    return { ...this, user: undefined };
  }
}
