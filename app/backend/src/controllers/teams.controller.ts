import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

async function getAll(_req: Request, res: Response) {
  const { status, data } = await teamsService.getAll();
  return res.status(status).json(data);
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const { status, data } = await teamsService.getById(id);
  return res.status(status).json(data);
}

export default {
  getAll,
  getById,
};
