import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

async function getAll(_req: Request, res: Response) {
  const { status, data } = await teamsService.getAll();
  return res.status(status).json(data);
}

export default {
  getAll,
};
