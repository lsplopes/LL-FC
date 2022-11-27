import { NextFunction, Request, Response } from 'express';
import teamsService from '../services/teams.service';

async function checkTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    const message = { message: 'It is not possible to create a match with two equal teams' };
    return res.status(422).json(message);
  }

  const idOneCheck = (await teamsService.getById(homeTeam)).status === 200;
  const idTwoCheck = (await teamsService.getById(awayTeam)).status === 200;

  if (!idOneCheck || !idTwoCheck) {
    const message = { message: 'There is no team with such id!' };
    return res.status(404).json(message);
  }
  next();
}

export default checkTeams;
