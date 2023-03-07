import { SavingsPlanDuration, SavingsPlanFrequency, SavingsPlanType } from '../models/savingsPlan.model';
import User from '../models/user.model';

export interface CreateSavingsPlan {
  title: string;
  type: SavingsPlanType;
  amount: number;
  frequency: SavingsPlanFrequency;
  startDate: Date;
  endDate: Date;
  user: string;
  numberOfBuddies: number;
  duration: SavingsPlanDuration;
  relationship: string;
}
