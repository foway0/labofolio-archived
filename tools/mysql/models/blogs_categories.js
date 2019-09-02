const Sequelize = require('sequelize');

const TABLE_NAME = 'blogs_categories';
const STATUS = {
  valid: 1,
  invalid: 2,
  private: 3,
};

class BlogsCategories extends Sequelize.Model {
  static init(sequelize) {
    const attributes = {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      parent_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        comment: 'this is for recursive category',
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: STATUS.valid
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sort_num: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    };
    const options = {
      sequelize,
      modelName: TABLE_NAME,
      freezeTableName: true,
      timestamp: true,
      createdAt: 'created',
      updatedAt: false,
      charset: 'utf8',
    };

    return super.init(attributes, options);
  }
}
module.exports = sequelize => {
  BlogsCategories.init(sequelize);

  return BlogsCategories;
};