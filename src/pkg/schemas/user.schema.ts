import { string, TypeOf, z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be at most 20 characters' }),
    passwordConfirmation: string({ required_error: 'Password confirmation is required' })
      .min(6, { message: 'Password confirmation must be at least 6 characters' })
      .max(20, { message: 'Password confirmation must be at most 20 characters' }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be at most 20 characters' }),
  }),
});


export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];