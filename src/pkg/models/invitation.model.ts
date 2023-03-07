import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import Model from './entity.model';
import SavingsPlan from './savingsPlan.model';
import User from './user.model';

export enum SavingsInvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

@Entity('savings_invitations')
export default class SavingsInvitation extends Model {
  @Column()
  savingsPlanId!: string;

  @ManyToOne(() => SavingsPlan, (savingsPlan) => savingsPlan.savingsInvitations)
  @JoinColumn()
  savingsPlan!: SavingsPlan;

  @Column({
    type: 'enum',
    enum: SavingsInvitationStatus,
    default: SavingsInvitationStatus.PENDING,
  })
  status!: SavingsInvitationStatus;

  @ManyToOne(() => User, (user) => user.savingsInvitationsCreated)
  @JoinColumn({ name: 'createdById' })
  createdBy!: User;

  @Column()
  createdById!: string;

  @ManyToOne(() => User, (user) => user.savingsInvites)
  @JoinColumn({ name: 'invitedId' })
  invited!: User;

  @Column()
  invitedId!: string;
}
