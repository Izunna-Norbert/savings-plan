import { BeforeInsert, Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import bcrypt from 'bcrypt';
import Model from './entity.model';
import SavingsPlan from './savingsPlan.model';
import SavingsInvitation from './invitation.model';

@Entity('users')
export default class User extends Model {
  @Column()
  name!: string;

  @Index('email_index')
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => SavingsPlan, (savingsPlan) => savingsPlan.user)
  savingsPlans!: SavingsPlan[];

  @OneToOne(() => SavingsInvitation, (savingsInvitation) => savingsInvitation.invited)
  savingsInvites!: SavingsInvitation[];

  @OneToMany(() => SavingsInvitation, (savingsInvitation) => savingsInvitation.createdBy)
  savingsInvitationsCreated!: SavingsInvitation[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return { ...this, password: undefined };
  }
}
