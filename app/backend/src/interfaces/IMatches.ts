import MatchesModel from '../database/models/MatchesModel';

export interface IMatches extends MatchesModel {
  teamHome: object,
  teamAway: object,
}

export interface IMatchesPost {
  homeTeam: string,
  awayTeam: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
