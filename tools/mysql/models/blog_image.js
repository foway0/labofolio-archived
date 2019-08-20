const Sequelize = require('sequelize');

const TABLE_NAME = 'blog_image';

class BlogImage extends Sequelize.Model {
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
      mime_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_path: {
        type: Sequelize.STRING().BINARY,
        allowNull: false,
      },
      thumbnail_image_path: {
        type: Sequelize.STRING().BINARY,
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
  BlogImage.init(sequelize);

  return BlogImage;
};