import { EntityManager } from 'typeorm';
import { CreateUser } from '../interfaces/user.interface';
import Database from '../config/database.config';
import User from '../models/user.model';

export default class UserRepo {
  private readonly db: typeof Database;

  constructor(db: typeof Database) {
    this.db = db;
  }

  async createUser(input: Partial<User>): Promise<User> {
    return await this.db.getRepository(User).save(this.db.getRepository(User).create(input));
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.db.getRepository(User).findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.db.getRepository(User).findOneBy({ email });
  }
}
