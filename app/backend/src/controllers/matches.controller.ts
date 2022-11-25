import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

async function getAll(req: Request, res: Response) {
  const { inProgress } = req.query;
  const { status, data } = await matchesService.getAll(inProgress as string);
  return res.status(status).json(data);
}

export default {
  getAll,
};
