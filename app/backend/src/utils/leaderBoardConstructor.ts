import MatchesModel from '../database/models/MatchesModel';
import { ITeams } from '../interfaces/ITeams';

function totalPointsGetter(teamId: number, matches: MatchesModel[]) {
  let points = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId && match.homeTeamGoals > match.awayTeamGoals) {
      points += 3;
    }
    if (match.homeTeam === teamId && match.homeTeamGoals === match.awayTeamGoals) {
      points += 1;
    }
  });
  return points;
}

function totalVictoriesGetter(teamId: number, matches: MatchesModel[]) {
  let victories = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId && match.homeTeamGoals > match.awayTeamGoals) {
      victories += 1;
    }
  });
  return victories;
}

function totalDrawsGetter(teamId: number, matches: MatchesModel[]) {
  let draws = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId && match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
}

function totalLossesGetter(teamId: number, matches: MatchesModel[]) {
  let losses = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId && match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    }
  });
  return losses;
}

function goalsFavorGetter(teamId: number, matches: MatchesModel[]) {
  let goals = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId) {
      goals += match.homeTeamGoals;
    }
  });
  return goals;
}

function goalsOwnGetter(teamId: number, matches: MatchesModel[]) {
  let goals = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId) {
      goals += match.awayTeamGoals;
    }
  });
  return goals;
}

function efficiencyGetter(teamId: number, matches: MatchesModel[]) {
  const P = totalPointsGetter(teamId, matches);
  const J = matches.filter((match) => match.homeTeam === teamId).length;
  const efficiency = (P / (J * 3)) * 100;
  return efficiency.toFixed(2);
}

function lbConstructor(teams: ITeams[], matches: MatchesModel[]) {
  const result = teams.map((team) => {
    const objectReturn = {
      name: team.teamName,
      totalPoints: totalPointsGetter(team.id, matches),
      totalGames: matches.filter((match) => match.homeTeam === team.id).length,
      totalVictories: totalVictoriesGetter(team.id, matches),
      totalDraws: totalDrawsGetter(team.id, matches),
      totalLosses: totalLossesGetter(team.id, matches),
      goalsFavor: goalsFavorGetter(team.id, matches),
      goalsOwn: goalsOwnGetter(team.id, matches),
      goalsBalance: goalsFavorGetter(team.id, matches) - goalsOwnGetter(team.id, matches),
      efficiency: efficiencyGetter(team.id, matches),
    };
    return objectReturn;
  });
  return result;
}

function lbGetter(teams: ITeams[], matches: MatchesModel[]) {
  const data = lbConstructor(teams, matches);
  const sortedByGoalsOwn = data.sort((a, b) => b.goalsOwn - a.goalsOwn);
  const sortedByGoalsFavor = sortedByGoalsOwn.sort((a, b) => b.goalsFavor - a.goalsFavor);
  const sortedByGoalsBalance = sortedByGoalsFavor.sort((a, b) => b.goalsBalance - a.goalsBalance);
  const sortedByVictories = sortedByGoalsBalance
    .sort((a, b) => b.totalVictories - a.totalVictories);
  const sortedByPoints = sortedByVictories.sort((a, b) => b.totalPoints - a.totalPoints);
  return sortedByPoints;
}

export default lbGetter;
