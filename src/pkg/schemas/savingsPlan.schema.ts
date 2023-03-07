import { TypeOf, z } from "zod";
import { SavingsPlanType, SavingsPlanFrequency, SavingsPlanDuration } from "../models/savingsPlan.model";


export const CreateSavingsPlanSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }),
        type: z.string({ required_error: "Type is required" }).refine((data) => data in SavingsPlanType, {
            message: "Invalid type",
            path: ["type"],
        }),
        amount: z.number({ required_error: "Amount is required" }),
        frequency: z.string({ required_error: "Frequency is required" }).refine((data) => data in SavingsPlanFrequency, {
            message: "Invalid frequency",
            path: ["frequency"],
        }),
        startDate: z.string({ required_error: "Start date is required" }),
        endDate: z.string({ required_error: "End date is required" }),
        numberOfBuddies: z.number({ required_error: "Number of buddies is required" }),
        duration: z.string({ required_error: "Duration is required" }).refine((data) => data in SavingsPlanDuration, {
            message: "Invalid duration",
            path: ["duration"],
        }),
        relationship: z.string({ required_error: "Relationship is required" }),
    }),
});

export const InviteToSavingsPlanSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    }),
});

export type CreateSavingsPlanInput = TypeOf<typeof CreateSavingsPlanSchema>["body"];
export type InviteToSavingsPlanInput = TypeOf<typeof InviteToSavingsPlanSchema>["body"];
