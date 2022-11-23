import { NextFunction, Request, Response } from 'express';

import { UserCredentials } from '../interfaces/IUser';

function validateBody(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as UserCredentials;
  if (!email) return res.status(400).json({ message: 'All fields must be filled' });
  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  next();
}

export default validateBody;
