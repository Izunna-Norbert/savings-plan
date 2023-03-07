import Database from '../config/database.config';
import { CreateSavingsPlan } from '../interfaces/savingsPlan.interface';
import SavingsInvitation, { SavingsInvitationStatus } from '../models/invitation.model';
import SavingsPlan from '../models/savingsPlan.model';
import User from '../models/user.model';

export default class SavingsPlanRepo {
  private readonly db: typeof Database;
  constructor(db: typeof Database) {
    this.db = db;
  }

  async Create(input: Partial<SavingsPlan>): Promise<SavingsPlan> {
    return await this.db.getRepository(SavingsPlan).save(this.db.getRepository(SavingsPlan).create(input));
  }

  async getSavingsPlanById(id: string): Promise<SavingsPlan | null> {
    return await this.db.getRepository(SavingsPlan).findOneBy({ id });
  }

  async getSavingsPlanByUser(id: string): Promise<SavingsPlan | null> {
    return await this.db.getRepository(SavingsPlan).findOneBy({ userId: id });
  }

  async getSavingsPlansByUser(id: string): Promise<SavingsPlan[]> {
    return await this.db.getRepository(SavingsPlan).find({ order: { createdAt: 'DESC' }, where: { memberIds: id } });
  }

  async createInvitation(input: Partial<SavingsInvitation>): Promise<SavingsInvitation> {
    return await this.db.getRepository(SavingsInvitation).save(this.db.getRepository(SavingsInvitation).create(input));
  }

  async createMultipleInvitations(input: Partial<SavingsInvitation>[]): Promise<SavingsInvitation[]> {
    return await this.db.getRepository(SavingsInvitation).save(this.db.getRepository(SavingsInvitation).create(input));
  }

  async declineInvitation(id: string, userId: string): Promise<SavingsInvitation | null> {
    const response = await this.db.getRepository(SavingsInvitation).findOneBy({ id, invitedId: userId });
    if (!response) {
      return null;
    }
    response.status = SavingsInvitationStatus.DECLINED;
    return await this.db.getRepository(SavingsInvitation).save(response);
  }

  async acceptInvitation(id: string, userId: string): Promise<SavingsInvitation | null> {
    const response = await this.db.getRepository(SavingsInvitation).findOneBy({ id, invitedId: userId });
    if (!response) {
      return null;
    }
    response.status = SavingsInvitationStatus.ACCEPTED;
    return await this.db.getRepository(SavingsInvitation).save(response);
  }

  async getInvitationsByUser(id: string): Promise<SavingsInvitation[] | null> {
    return await this.db.getRepository(SavingsInvitation).find({ where: { invitedId: id } });
  }

  async getInvitationById(id: string): Promise<SavingsInvitation | null> {
    return await this.db.getRepository(SavingsInvitation).findOne({ relations: {
        invited: true,
    }, where: { id } });
  }

  async addBuddyToSavingsPlan(id: string, user: User, userId: string): Promise<SavingsPlan | null> {
    const response = await this.db.getRepository(SavingsPlan).findOneBy({ id });
    if (!response) {
      return null;
    }
    if (response.memberIds?.includes(userId)) {
      return null;
    }
    response.memberIds = response.memberIds ? [...response.memberIds, userId] : [userId];
    response.members = response.members ? [...response.members, user] : [user];
    return await this.db.getRepository(SavingsPlan).save(response);
  }
}
