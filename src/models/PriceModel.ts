import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

class Price extends Model {
  public id!: number;
  public value!: number;
}

Price.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'prices',
    sequelize,
  }
);

export default Price;
