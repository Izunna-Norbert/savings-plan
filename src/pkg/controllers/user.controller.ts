import { Request, Response } from 'express';
import { CreateUser } from '../interfaces/user.interface';
import { CreateUserInput } from '../schemas/user.schema';
import UserUsecase from '../usecases/user.usecase';

export default class UserController {
  private readonly usecase: UserUsecase;

  constructor(usecase: UserUsecase) {
    this.usecase = usecase;
  }

  createUser = async(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
  ): Promise<Response> => {
    try {
      const { name, email, password } = req.body;
      const body: CreateUser = { name, email, password };
      const { data, error, message } = await this.usecase.createUser(body);
      if (error) return res.status(400).json({ error, message });
      return res.status(201).json({ data, message });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }

  loginUser = async(req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const { data, error, message } = await this.usecase.loginUser({ email, password });
      if (error) return res.status(400).json({ error, message });
      return res.status(200).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  }

  getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { data, error, message } = await this.usecase.getUser(req.params.id);
      if (error) return res.status(400).json({ error, message });
      return res.status(200).json({ data, message });
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };
}
