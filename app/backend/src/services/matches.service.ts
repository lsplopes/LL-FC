import { IQuery } from '../interfaces/IQuery';
import MatchesModel from '../database/models/MatchesModel';
import { IMatchesPost } from '../interfaces/IMatches';

async function getAll(inProgress?: string) {
  let queryParams: IQuery = {
    include: [
      {
        association: MatchesModel.associations.teamHome,
        attributes: ['teamName'],
      },
      {
        association: MatchesModel.associations.teamAway,
        attributes: ['teamName'],
      },
    ],
  };
  if (inProgress !== undefined) {
    const bool = inProgress === 'true';
    queryParams = { where: { inProgress: bool }, ...queryParams };
  }
  const data = await MatchesModel.findAll(queryParams as object);
  return { status: 200, data };
}

async function createMatch(params: IMatchesPost) {
  const { dataValues } = await MatchesModel.create({
    ...params,
    inProgress: true,
  });
  return { status: 201, message: dataValues };
}

async function finishMatch(id: string) {
  await MatchesModel.update(
    { inProgress: false },
    { where: { id } },
  );
  return { status: 200, message: 'Finished' };
}

async function updateMatch(body: IMatchesPost, id: string) {
  const { homeTeamGoals, awayTeamGoals } = body;
  await MatchesModel.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );
  const message = { message: 'Match updated' };
  return { status: 200, message };
}

export default {
  getAll,
  createMatch,
  finishMatch,
  updateMatch,
};
