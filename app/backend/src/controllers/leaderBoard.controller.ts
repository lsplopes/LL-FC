import { Request, Response } from 'express';
import leaderBoardService from '../services/leaderBoard.service';

async function getHomeTeamLeaders(_req: Request, res: Response) {
  const { status, message } = await leaderBoardService.getTeamLeaders('home');
  return res.status(status).json(message);
}

async function getAwayTeamLeaders(_req: Request, res: Response) {
  const { status, message } = await leaderBoardService.getTeamLeaders('away');
  return res.status(status).json(message);
}

async function getTeamLeaders(_req: Request, res: Response) {
  const { status, message } = await leaderBoardService.getTeamLeaders();
  return res.status(status).json(message);
}

export default {
  getHomeTeamLeaders,
  getAwayTeamLeaders,
  getTeamLeaders,
};
