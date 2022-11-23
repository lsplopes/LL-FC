import { Model, DataTypes } from 'sequelize';
import db from '.';
// import TeamsModel from './TeamsModel';

class MatchesModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    // field: 'home_team',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    // field: 'home_team_goals',
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    // field: 'away_team',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    // field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    // field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Matches.belongsTo(TeamsModel, { foreignKey: 'id', as: 'teams' });
// Matches.belongsTo(TeamsModel, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default MatchesModel;
