export const successGetAllMatchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Internacional"
    }
  }
]

export const successGetAllMatchesMockTwo = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Internacional"
    }
  }
]

export const successGetAllTrueMatchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Internacional"
    }
  }
]

export const successGetAllFalseMatchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Internacional"
    }
  }
]

export const successMatchInsertion = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const successMatchInsertionReturn = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

export const failedMatchInsertionEqualTeams = {
  homeTeam: 8,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const finishedMessageMock = {
  message: 'Finished',
}

export const updatedMessageMock = {
  message: 'Match updated',
}