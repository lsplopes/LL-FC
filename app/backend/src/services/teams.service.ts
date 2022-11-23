import Teams from '../database/models/TeamsModel';

async function getAll() {
  const data = await Teams.findAll();
  return { status: 200, data };
}

async function getById(id: string) {
  const data = await Teams.findByPk(id, { attributes: ['id', 'teamName'] });
  if (!data) {
    return { status: 404, data: { message: 'Team Not Found' } };
  }
  return { status: 200, data };
}

export default {
  getAll,
  getById,
};
