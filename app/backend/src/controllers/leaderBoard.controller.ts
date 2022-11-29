import { Request, Response } from 'express';
import leaderBoardService from '../services/leaderBoard.service';

async function getHomeTeamLeaders(req: Request, res: Response) {
  const { status, message } = await leaderBoardService.getTeamLeaders('home');
  return res.status(status).json(message);
}

async function getAwayTeamLeaders(req: Request, res: Response) {
  const { status, message } = await leaderBoardService.getTeamLeaders('away');
  return res.status(status).json(message);
}

export default {
  getHomeTeamLeaders,
  getAwayTeamLeaders,
};
