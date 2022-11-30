import Teams from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import lbGetter from '../utils/leaderBoardConstructor';

async function getTeamLeaders(matchType?: string) {
  const teams = await Teams.findAll();
  const matches = await MatchesModel.findAll({ where: { inProgress: 'false' } });
  const message = lbGetter(teams, matches, matchType);
  return { status: 200, message };
}

export default {
  getTeamLeaders,
};
