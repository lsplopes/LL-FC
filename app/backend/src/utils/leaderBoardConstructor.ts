import MatchesModel from '../database/models/MatchesModel';
import { ITeams } from '../interfaces/ITeams';

function anyTypeGetter(teamId: number, match: MatchesModel) {
  if (teamId === match.homeTeam) {
    return { principalTeam: match.homeTeam,
      principalGoals: match.homeTeamGoals,
      secondaryGoals: match.awayTeamGoals,
    };
  }
  return { principalTeam: match.awayTeam,
    principalGoals: match.awayTeamGoals,
    secondaryGoals: match.homeTeamGoals,
  };
}

function typeGetter(teamId: number, match: MatchesModel, matchType?: string) {
  if (matchType === 'home') {
    return { principalTeam: match.homeTeam,
      principalGoals: match.homeTeamGoals,
      secondaryGoals: match.awayTeamGoals,
    };
  }
  if (matchType === 'away') {
    return { principalTeam: match.awayTeam,
      principalGoals: match.awayTeamGoals,
      secondaryGoals: match.homeTeamGoals,
    };
  }
  return anyTypeGetter(teamId, match);
}

function totalPointsGetter(teamId: number, matches: MatchesModel[], matchType?: string) {
  let points = 0;
  matches.forEach((match) => {
    const { principalTeam, principalGoals, secondaryGoals } = typeGetter(teamId, match, matchType);
    if (principalTeam === teamId && principalGoals > secondaryGoals) {
      points += 3;
    }
    if (principalTeam === teamId && principalGoals === secondaryGoals) {
      points += 1;
    }
  });
  return points;
}

function totalVictoriesGetter(teamId: number, matches: MatchesModel[], matchType?: string) {
  let victories = 0;
  matches.forEach((match) => {
    const { principalTeam, principalGoals, secondaryGoals } = typeGetter(teamId, match, matchType);
    if (principalTeam === teamId && principalGoals > secondaryGoals) {
      victories += 1;
    }
  });
  return victories;
}

function totalDrawsGetter(teamId: number, matches: MatchesModel[], matchType?: string) {
  let draws = 0;
  matches.forEach((match) => {
    const { principalTeam, principalGoals, secondaryGoals } = typeGetter(teamId, match, matchType);
    if (principalTeam === teamId && principalGoals === secondaryGoals) {
      draws += 1;
    }
  });
  return draws;
}

function totalLossesGetter(teamId: number, matches: MatchesModel[], matchType?: string) {
  let losses = 0;
  matches.forEach((match) => {
    const { principalTeam, principalGoals, secondaryGoals } = typeGetter(teamId, match, matchType);
    if (principalTeam === teamId && principalGoals < secondaryGoals) {
      losses += 1;
    }
  });
  return losses;
}

function goalsFavorGetter(teamId: number, matches: MatchesModel[], matchType?: string) {
  let goals = 0;
  matches.forEach((match) => {
    const { principalTeam, principalGoals } = typeGetter(teamId, match, matchType);
    if (principalTeam === teamId) {
      goals += principalGoals;
    }
  });
  return goals;
}

function goalsOwnGetter(teamId: number, matches: MatchesModel[], matchType?: string) {
  let goals = 0;
  matches.forEach((match) => {
    const { principalTeam, secondaryGoals } = typeGetter(teamId, match, matchType);
    if (principalTeam === teamId) {
      goals += secondaryGoals;
    }
  });
  return goals;
}

function efficiencyGetter(teamId: number, matches: MatchesModel[], matchType?: string) {
  const P = totalPointsGetter(teamId, matches, matchType);
  const J = matches.filter((match) => {
    const { principalTeam } = typeGetter(teamId, match, matchType);
    return principalTeam === teamId;
  }).length;
  const efficiency = (P / (J * 3)) * 100;
  return efficiency.toFixed(2);
}

function totalGamesGetter(team: ITeams, matches: MatchesModel[], matchType?: string) {
  if (matchType === 'home') return matches.filter((match) => match.homeTeam === team.id).length;
  if (matchType === 'away') return matches.filter((match) => match.awayTeam === team.id).length;
  return matches.filter((match) => match.awayTeam === team.id || match.homeTeam === team.id).length;
}

function lbConstructor(teams: ITeams[], matches: MatchesModel[], matchType?: string) {
  const result = teams.map((team) => {
    const objectReturn = {
      name: team.teamName,
      totalPoints: totalPointsGetter(team.id, matches, matchType),
      totalGames: totalGamesGetter(team, matches, matchType),
      totalVictories: totalVictoriesGetter(team.id, matches, matchType),
      totalDraws: totalDrawsGetter(team.id, matches, matchType),
      totalLosses: totalLossesGetter(team.id, matches, matchType),
      goalsFavor: goalsFavorGetter(team.id, matches, matchType),
      goalsOwn: goalsOwnGetter(team.id, matches, matchType),
      goalsBalance: goalsFavorGetter(team.id, matches, matchType)
        - goalsOwnGetter(team.id, matches, matchType),
      efficiency: efficiencyGetter(team.id, matches, matchType),
    };
    return objectReturn;
  });
  return result;
}

function lbGetter(teams: ITeams[], matches: MatchesModel[], matchType?: string) {
  const data = lbConstructor(teams, matches, matchType);
  const sortedByGoalsOwn = data.sort((a, b) => b.goalsOwn - a.goalsOwn);
  const sortedByGoalsFavor = sortedByGoalsOwn.sort((a, b) => b.goalsFavor - a.goalsFavor);
  const sortedByGoalsBalance = sortedByGoalsFavor.sort((a, b) => b.goalsBalance - a.goalsBalance);
  const sortedByVictories = sortedByGoalsBalance
    .sort((a, b) => b.totalVictories - a.totalVictories);
  const sortedByPoints = sortedByVictories.sort((a, b) => b.totalPoints - a.totalPoints);
  return sortedByPoints;
}

export default lbGetter;
