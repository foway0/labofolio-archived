import { Sequelize, Model, DataTypes } from 'sequelize';
import { InitOptions, ModelAttributes } from 'sequelize/types/lib/model';

const TABLE_NAME = 'blogs';
const STATUS = {
  invalid: 'invalid',
  valid: 'valid'
};

class Blogs extends Model {
  public id!: number;
  public status!: number;
  public subject!: string;
  public content_text!: string;
  public content_md!: string;
  public content_html!: string;
  public created!: Date;

  static attach(sequelize: Sequelize) {
    const attribute: ModelAttributes = {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.ENUM(STATUS.invalid, STATUS.valid),
        allowNull: false,
        defaultValue: STATUS.valid
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content_text: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'search only'
      },
      content_md: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      content_html: {
        type: DataTypes.TEXT,
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
      indexes: [
        {
          type: 'FULLTEXT',
          fields: ['subject', 'content_text'],
          parser: 'ngram'
        }
      ]
    };
    this.init(attribute, options);
  }

  static getStatus() {
    return STATUS;
  }
}

const factory = (sequelize: Sequelize) => {
  Blogs.attach(sequelize);

  return Blogs;
};

export { Blogs, factory };
