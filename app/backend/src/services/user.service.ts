import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import User from '../database/models/UserModel';
import { UserCredentials } from '../interfaces/IUser';
import config from '../utils/jwtconfig';

dotenv.config();

async function login(credentials: UserCredentials) {
  const info = await User.findOne({
    where: { email: credentials.email },
  });
  if (!info || !compareSync(credentials.password, info.password)) {
    return { status: 401, data: { message: 'Incorrect email or password' } };
  }
  const { password: _, ...userWithoutPassword } = info.dataValues;

  const token = jwt.sign({ userWithoutPassword }, process.env.JWT_SECRET as string, config);
  const data = { token };
  return { status: 200, data };
}

export default {
  login,
};
