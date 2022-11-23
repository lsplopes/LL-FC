import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

async function getAll(_req: Request, res: Response) {
  const { status, data } = await matchesService.getAll();
  return res.status(status).json(data);
}

export default {
  getAll,
};
