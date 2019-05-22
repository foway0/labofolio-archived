const Sequelize = require('sequelize');

const TABLE_NAME = 'sample';
const STATUS = {
  valid: 1,   // 有効
  invalid: 2, // 無効
};

// FIXME CHECK DEFINE DATA TYPES
class Sample extends Sequelize.Model { }

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

module.exports = sequelize => {
  Sample.init(attributes, {
    sequelize,
    modelName: TABLE_NAME,
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'modified',
    charset: 'utf8',
  });

  return Sample;
};
module.exports.STATUS = STATUS;