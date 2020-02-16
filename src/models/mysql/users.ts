import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize';

const TABLE_NAME = 'users';
const STATUS = {
  invalid: 'invalid',
  valid: 'valid'
};
const ROLE_ID = {
  viewer: 'viewer',
  admin: 'admin'
};

class Users extends Model {
  public id!: number;
  public strategy_id!: string;
  public status!: number;
  public role_id!: number;
  public nickname!: string;

  static attach(sequelize: Sequelize) {
    const attribute: ModelAttributes = {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      strategy_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(STATUS.invalid, STATUS.valid),
        allowNull: false,
        defaultValue: STATUS.valid
      },
      role_id: {
        type: DataTypes.ENUM(ROLE_ID.viewer, ROLE_ID.admin),
        allowNull: false,
        defaultValue: ROLE_ID.viewer
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false
      }
    };

    const options: InitOptions = {
      sequelize,
      modelName: TABLE_NAME,
      freezeTableName: true,
      timestamps: true,
      underscored: false,
      createdAt: 'created',
      updatedAt: 'modified',
      charset: 'utf8',
      indexes: [{ unique: true, fields: ['strategy_id'] }]
    };

    this.init(attribute, options);
  }

  static getStatus() {
    return STATUS;
  }

  static getRoleId() {
    return ROLE_ID;
  }
}

const factory = (sequelize: Sequelize) => {
  Users.attach(sequelize);

  return Users;
};

export { Users, factory };
