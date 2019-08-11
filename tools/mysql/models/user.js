const Sequelize = require('sequelize');

const TABLE_NAME = 'user';
const STATUS = {
  valid: 1, // 有効
  invalid: 2, // 無効
};
const ROLE_ID = {
  viewer: 1,
  admin: 999,
};

class User extends Sequelize.Model {
  static init(sequelize) {
    const attributes = {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER.UNSIGNED,
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
      timestamp: true,
      createdAt: 'created',
      updatedAt: 'modified',
      charset: 'utf8',
    };

    return super.init(attributes, options);
  }
}
module.exports = sequelize => {
  User.init(sequelize);

  return User;
};