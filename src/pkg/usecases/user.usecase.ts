import { CreateUser, LoginUser, LoginUserResponse, UserResponse } from '../interfaces/user.interface';
import UserRepo from '../repos/user.repo';
import { generateToken } from '../utils/jwt.util';

export default class UserUsecase {
  private repo: UserRepo;

  constructor(repo: UserRepo) {
    this.repo = repo;
  }

  createUser = async(input: CreateUser): Promise<UserResponse> => {
    try {
      const email = await this.repo.getUserByEmail(input.email);
      if (email) {
        return {
          message: 'User already exists',
          error: 'User already exists',
        };
      }
      const data = await this.repo.createUser(input);
      if (!data) {
        return {
          message: 'User not created',
          error: 'User not created',
        };
      }
      return {
        message: 'User created',
        data,
      };
    } catch (error: any) {
      return {
        message: 'User not created',
        error: error.message,
      };
    }
  }

  loginUser = async (input: LoginUser): Promise<LoginUserResponse> => {
    try {
      const data = await this.repo.getUserByEmail(input.email);
      if (!data) {
        return {
          message: 'User not found',
          error: 'User not found',
        };
      }
      const isMatch = await data.comparePassword(input.password);
      if (!isMatch) {
        return {
          message: 'Incorrect password',
          error: 'Incorrect password',
        };
      }
      const token = generateToken(data);
      return {
        message: 'User logged in',
        data: {
          token,
          user: data,
        },
      };
    } catch (error: any) {
      return {
        message: 'User not logged in',
        error: error.message,
      };
    }
  };

  getUser = async (id: string): Promise<UserResponse> => {
    try {
      const data = await this.repo.getUserById(id);
      if (!data) {
        return {
          message: 'User not found',
          error: 'User not found',
        };
      }
      return {
        message: 'User found',
        data,
      };
    } catch (error: any) {
      return {
        message: 'User not found',
        error: error.message,
      };
    }
  };
}
