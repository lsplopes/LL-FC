import { Request, Response } from 'express';
import { UserCredentials } from '../interfaces/IUser';

import userService from '../services/user.service';

async function login(req: Request, res: Response) {
  const credentials = req.body as UserCredentials;
  const { status, data } = await userService.login(credentials);
  return res.status(status).json(data);
}

function loginValidation(req: Request, res: Response) {
  const { user } = req.body.user;
  return res.status(200).json({ role: user.role });
}

export default { login, loginValidation };
