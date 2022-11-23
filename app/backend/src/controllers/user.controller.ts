import { Request, Response } from 'express';
import { UserCredentials } from '../interfaces/IUser';

import userService from '../services/user.service';

async function login(req: Request, res: Response) {
  const credentials = req.body as UserCredentials;
  const { status, data } = await userService.login(credentials);
  return res.status(status).json(data);
}

export default { login };
