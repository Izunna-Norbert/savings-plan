import { CreateSavingsPlan } from '../interfaces/savingsPlan.interface';
import SavingsInvitation, { SavingsInvitationStatus } from '../models/invitation.model';
import SavingsPlan from '../models/savingsPlan.model';
import SavingsPlanRepo from '../repos/savingsPlan.repo';
import UserRepo from '../repos/user.repo';

export default class SavingsPlanUsecase {
    private savingsrepo: SavingsPlanRepo;
    private userrepo: UserRepo;
  constructor(savingsrepo: SavingsPlanRepo, userrepo: UserRepo) {
    this.savingsrepo = savingsrepo;
    this.userrepo = userrepo;
  }

  createSavingsPlan = async (request: CreateSavingsPlan): Promise<any> => {
    try {
      const user = await this.userrepo.getUserById(request.user);
      if (!user) {
        return {
          message: 'User does not exist',
          error: 'User does not exist',
        };
      }
      const savingsPlan = new SavingsPlan();
      savingsPlan.title = request.title;
      savingsPlan.type = request.type;
      savingsPlan.amount = request.amount;
      savingsPlan.frequency = request.frequency;
      savingsPlan.startDate = request.startDate;
      savingsPlan.endDate = request.endDate;
      savingsPlan.user = user;
      savingsPlan.userId = user.id;
      savingsPlan.numberOfBuddies = request.numberOfBuddies;
      savingsPlan.duration = request.duration;
      savingsPlan.relationship = request.relationship;
      savingsPlan.members = [user];
      savingsPlan.memberIds = [user.id];

      const response = await this.savingsrepo.Create(savingsPlan);
      if (!response) {
        return {
          message: 'Could not create savings plan',
          error: 'Could not create savings plan',
        };
      }

      return {
        message: 'Savings plan created successfully',
        data: response,
      };
    } catch (error: any) {
      return {
        message: 'Could not create savings plan',
        error: error.message,
      };
    }
  };

  getSavingsPlan = async (id: string, userId: string): Promise<any> => {
    try {
      const savingsPlan = await this.savingsrepo.getSavingsPlanById(id);
      if (!savingsPlan) {
        return {
          message: 'Savings plan does not exist',
          error: 'Savings plan does not exist',
        };
      }

      return {
        message: 'Savings plan retrieved successfully',
        data: savingsPlan,
      };
    } catch (error: any) {
      return {
        message: 'Could not retrieve savings plan',
        error: error.message,
      };
    }
  };

  getUserSavingsPlans = async (id: string): Promise<any> => {
    try {
      const user = await this.userrepo.getUserById(id);
      if (!user) {
        return {
          message: 'User does not exist',
          error: 'User does not exist',
        };
      }
      const savingsPlans = await this.savingsrepo.getSavingsPlansByUser(user.id);
      if (!savingsPlans) {
        return {
          message: 'Could not retrieve savings plans',
          error: 'Could not retrieve savings plans',
        };
      }

      return {
        message: 'Savings plans retrieved successfully',
        data: savingsPlans,
      };
    } catch (error: any) {
      return {
        message: 'Could not retrieve savings plans',
        error: error.message,
      };
    }
  };

  inviteBuddy = async (id: string, email: string, userId: string): Promise<any> => {
    try {
      const savingsPlan = await this.savingsrepo.getSavingsPlanById(id);
      if (!savingsPlan) {
        return {
          message: 'Savings plan does not exist',
          error: 'Savings plan does not exist',
        };
      }

      if (savingsPlan.userId !== userId) {
        return {
          message: 'You are not authorized to perform this action',
          error: 'You are not authorized to perform this action',
        };
      }

      const user = await this.userrepo.getUserByEmail(email);
      if (!user) {
        return {
          message: 'User does not exist',
          error: 'User does not exist',
        };
      }
      if (user.id === savingsPlan.userId) {
        return {
          message: 'You cannot invite yourself',
          error: 'You cannot invite yourself',
        };
      }

      const invitation = new SavingsInvitation();
      invitation.savingsPlanId = savingsPlan.id;
      invitation.createdBy = savingsPlan.user;
      invitation.createdById = savingsPlan.userId;
      invitation.savingsPlan = savingsPlan;
      invitation.savingsPlanId = savingsPlan.id;
      invitation.invited = user;
      invitation.invitedId = user.id;

      const response = await this.savingsrepo.createInvitation(invitation);
      if (!response) {
        return {
          message: 'Could not invite buddy',
          error: 'Could not invite buddy',
        };
      }

      return {
        message: 'Buddy invited successfully',
        data: response,
      };
    } catch (error: any) {
      console.error(error);
      return {
        message: 'Could not invite buddy',
        error: error.message,
      };
    }
  };

  getInvitations = async (id: string): Promise<any> => {
    try {
      const user = await this.userrepo.getUserById(id);
      if (!user) {
        return {
          message: 'User does not exist',
          error: 'User does not exist',
        };
      }

      const invitations = await this.savingsrepo.getInvitationsByUser(user.id);
      if (!invitations) {
        return {
          message: 'Could not retrieve invitations',
          error: 'Could not retrieve invitations',
        };
      }

      return {
        message: 'Invitations retrieved successfully',
        data: invitations,
      };
    } catch (error: any) {
      return {
        message: 'Could not retrieve invitations',
        error: error.message,
      };
    }
  };

  acceptInvitation = async (id: string, userId: string): Promise<any> => {
    try {
      const invitation = await this.savingsrepo.getInvitationById(id);
      if (!invitation) {
        return {
          message: 'Invitation does not exist',
          error: 'Invitation does not exist',
        };
      }
      if (invitation.invitedId !== userId) {
        return {
          message: 'You are not authorized to perform this action',
          error: 'You are not authorized to perform this action',
        };
      }
      if (invitation.status == SavingsInvitationStatus.DECLINED) {
        return {
          message: 'Invitation has been declined',
          error: 'Invitation has been declined',
        };
      }
      if (invitation.status == SavingsInvitationStatus.ACCEPTED) {
        return {
          message: 'Invitation has been accepted',
          error: 'Invitation has been accepted',
        };
      }

      invitation.status = SavingsInvitationStatus.ACCEPTED;
      await invitation.save();

      await this.savingsrepo.addBuddyToSavingsPlan(invitation.savingsPlanId, invitation.invited, invitation.invitedId)

      return {
        message: 'Invitation accepted successfully',
        data: invitation,
      };
    } catch (error: any) {
      return {
        message: 'Could not accept invitation',
        error: error.message,
      };
    }
  };

  declineInvitation = async (id: string, userId: string): Promise<any> => {
    try {
      const invitation = await this.savingsrepo.getInvitationById(id);
      if (!invitation) {
        return {
          message: 'Invitation does not exist',
          error: 'Invitation does not exist',
        };
      }
      if (invitation.invitedId !== userId) {
        return {
          message: 'You are not authorized to perform this action',
          error: 'You are not authorized to perform this action',
        };
      }
      if (invitation.status == SavingsInvitationStatus.DECLINED) {
        return {
          message: 'Invitation has been declined',
          error: 'Invitation has been declined',
        };
      }
      if (invitation.status == SavingsInvitationStatus.ACCEPTED) {
        return {
          message: 'Invitation has been accepted',
          error: 'Invitation has been accepted',
        };
      }

      invitation.status = SavingsInvitationStatus.DECLINED;
      await invitation.save();

      return {
        message: 'Invitation declined successfully',
        data: invitation,
      };
    } catch (error: any) {
      return {
        message: 'Could not decline invitation',
        error: error.message,
      };
    }
  };
}
