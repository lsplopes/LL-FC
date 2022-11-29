import matchesService from './matches.service';
import teamService from './teams.service';
import lbGetter from '../utils/leaderBoardConstructor';

async function getTeamLeaders(matchType?: string) {
  const { data: teams } = await teamService.getAll();
  const { data: matches } = await matchesService.getAll('false');
  const message = lbGetter(teams, matches, matchType);
  return { status: 200, message };
}

export default {
  getTeamLeaders,
};
