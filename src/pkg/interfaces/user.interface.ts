import User from '../models/user.model';

export interface UserResponse {
  message: string;
  data?: User;
  error?: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  message: string;
  data?: {
    token: string;
    user: User;
  };
  error?: string;
}
