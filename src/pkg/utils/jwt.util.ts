import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/constants';

export const generateToken = (payload: any): string => {
  const plainPayload = JSON.parse(JSON.stringify(payload));
  return jwt.sign(plainPayload, JWT_SECRET);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
