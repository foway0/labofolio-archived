const Sequelize = require('sequelize');

const TABLE_NAME = 'blogs';
const STATUS = {
  valid: 1,
  invalid: 2,
};

class Blogs extends Sequelize.Model {
  static init(sequelize) {
    const attributes = {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      blog_category_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: STATUS.valid
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_text: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'search only',
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
      updatedAt: 'modified',
      charset: 'utf8',
      indexes: [
        {type: 'FULLTEXT', fields: ['subject', 'content_text'], parser: 'ngram'},
      ],
    };

    return super.init(attributes, options);
  }
}
module.exports = sequelize => {
  Blogs.init(sequelize);

  return Blogs;
};