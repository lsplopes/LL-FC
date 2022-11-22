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

MatchesModel.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'homeTeam' });
MatchesModel.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'awayTeam' });

Teams.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'homeTeam' });
Teams.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Teams;
