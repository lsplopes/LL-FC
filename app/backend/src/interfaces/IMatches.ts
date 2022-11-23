import MatchesModel from '../database/models/MatchesModel';

export interface IMatches extends MatchesModel {
  teamHome: object,
  teamAway: object,
}
