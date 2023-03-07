import { Response, Request } from 'express';
import { CreateSavingsPlan } from '../interfaces/savingsPlan.interface';
import SavingsPlanUsecase from '../usecases/savingsPlan.usecase';

export default class SavingsPlanController {
  constructor(private usecase: SavingsPlanUsecase) {
    this.usecase = usecase;
  }

  createSavingsPlan = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, amount, endDate, type, frequency, startDate, numberOfBuddies, duration, relationship } = req.body;
      const body: CreateSavingsPlan = {
        title,
        type,
        amount,
        endDate,
        frequency,
        startDate,
        user: res.locals.user.id,
        numberOfBuddies,
        duration,
        relationship,
      };
      const { data, error, message } = await this.usecase.createSavingsPlan(body);
      if (error) return res.status(400).json({ error, message });
      return res.status(201).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  getSavingsPlan = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { data, error, message } = await this.usecase.getSavingsPlan(req.params.id, res.locals.user.id);
      if (error) return res.status(400).json({ error, message });
      return res.status(200).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  getUserSavingsPlans = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { data, error, message } = await this.usecase.getUserSavingsPlans(res.locals.user.id);
      if (error) return res.status(400).json({ error, message });
      return res.status(200).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  inviteBuddy = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { data, error, message } = await this.usecase.inviteBuddy(
        req.params.id,
        req.body.email,
        res.locals.user.id,
      );
      if (error) return res.status(400).json({ error, message });
      return res.status(200).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  getInvites = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { data, error, message } = await this.usecase.getInvitations(res.locals.user.id);
      if (error) return res.status(400).json({ error, message });
      return res.status(200).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  acceptInvitation = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { data, error, message } = await this.usecase.acceptInvitation(req.params.id, res.locals.user.id);
      if (error) return res.status(400).json({ error, message });
      return res.status(200).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  declineInvitation = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { data, error, message } = await this.usecase.declineInvitation(req.params.id, res.locals.user.id);
      if (error) return res.status(400).json({ error, message });
      return res.status(200).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };
}
