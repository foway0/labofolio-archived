const Sequelize = require('sequelize');

const TABLE_NAME = 'blog_snapshot';

class BlogSnapshot extends Sequelize.Model {
  static init(sequelize) {
    const attributes = {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      blog_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_text: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'search only'
      },
      content_md: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      content_html: {
        type: Sequelize.TEXT,
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
  BlogSnapshot.init(sequelize);

  return BlogSnapshot;
};