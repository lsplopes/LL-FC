// import Teams from '../database/models/TeamsModel';
import { IQuery } from '../interfaces/IQuery';
import MatchesModel from '../database/models/MatchesModel';

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

export default {
  getAll,
};
