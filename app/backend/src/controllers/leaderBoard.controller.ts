import { Request, Response } from 'express';
import leaderBoardService from '../services/leaderBoard.service';

async function getHomeTeamLeaders(req: Request, res: Response) {
  const { status, message } = await leaderBoardService.getHomeTeamLeaders();
  return res.status(status).json(message);
}

export default {
  getHomeTeamLeaders,
};
