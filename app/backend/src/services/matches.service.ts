// import Teams from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

async function getAll() {
  const data = await MatchesModel.findAll({
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
  });
  return { status: 200, data };
}

export default {
  getAll,
};
