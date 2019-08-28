const Sequelize = require('sequelize');

const TABLE_NAME = 'users';
const STATUS = {
  valid: 1, // 有効
  invalid: 2, // 無効
};
const ROLE_ID = {
  viewer: 1,
  admin: 999,
};

class Users extends Sequelize.Model {
  static init(sequelize) {
    const attributes = {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      strategy_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: STATUS.valid,
      },
      role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: ROLE_ID.viewer,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_agent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_access: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    };
    const options = {
      sequelize,
      modelName: TABLE_NAME,
      freezeTableName: true,
      timestamp: true,
      createdAt: 'created',
      updatedAt: 'modified',
      charset: 'utf8',
      indexes: [
        {unique: true, fields: ['strategy_id']},
      ],
    };

    return super.init(attributes, options);
  }
}
module.exports = sequelize => {
  Users.init(sequelize);

  return Users;
};