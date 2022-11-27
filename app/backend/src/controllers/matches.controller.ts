import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

async function getAll(req: Request, res: Response) {
  const { inProgress } = req.query;
  const { status, data } = await matchesService.getAll(inProgress as string);
  return res.status(status).json(data);
}

async function createMatch(req: Request, res: Response) {
  const { status, message } = await matchesService.createMatch(req.body);
  return res.status(status).json(message);
}

async function finishMatch(req: Request, res: Response) {
  const { id } = req.params;
  const { status, message } = await matchesService.finishMatch(id);
  return res.status(status).json({ message });
}

export default {
  getAll,
  createMatch,
  finishMatch,
};
