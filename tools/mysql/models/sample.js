const Sequelize = require('sequelize');

const TABLE_NAME = 'sample';
const STATUS = {
  valid: 1,   // 有効
  invalid: 2, // 無効
};

// FIXME CHECK DEFINE DATA TYPES
class Sample extends Sequelize.Model {
  static init(sequelize) {
    const attributes = {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: STATUS.valid,
      },
      text: {
        type: Sequelize.STRING(255),
        allowNull: true,
      }
    };
    const options = {
      sequelize,
      modelName: TABLE_NAME,
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'modified',
      charset: 'utf8',
    };

    return super.init(attributes, options);
  }

  static getStatus() {
    return STATUS;
  }
}

module.exports = sequelize => {
  Sample.init(sequelize);

  return Sample;
};