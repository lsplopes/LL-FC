import Teams from '../database/models/TeamsModel';

async function getAll() {
  const data = await Teams.findAll();
  return { status: 200, data };
}

export default {
  getAll,
};
