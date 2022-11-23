import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import { UserCredentials } from '../interfaces/IUser';

dotenv.config();

function validateBody(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as UserCredentials;
  if (!email) return res.status(400).json({ message: 'All fields must be filled' });
  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  next();
}

function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const data = jwt.verify(authorization, process.env.JWT_SECRET as string);
  req.body.user = data;
  next();
}

export {
  validateBody,
  validateToken,
};
