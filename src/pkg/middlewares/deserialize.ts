import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '../constants/constants';
import { verifyToken } from '../utils/jwt.util';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      accessToken = req.cookies.token;
    }
    if (!accessToken) {
      res.status(401).json({
        message: 'You are not logged in! Please log in to get access',
        error: 'You are not logged in! Please log in to get access',
      });
      return;
    }
    const decoded = verifyToken(accessToken);

    if (!decoded) {
      return next(new Error('You are not logged in! Please log in to get access'));
    }

    // TODO: check if user still exists
    res.locals.user = decoded;
    next();
  } catch (error: any) {
    next(error);
  }
};
