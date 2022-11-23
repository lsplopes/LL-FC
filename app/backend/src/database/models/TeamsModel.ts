import { Model, DataTypes } from 'sequelize';
import db from '.';
import MatchesModel from './MatchesModel';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

MatchesModel.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Teams;
