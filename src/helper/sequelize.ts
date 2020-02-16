import { Sequelize, Model } from 'sequelize';
import { FindAndCountOptions } from 'sequelize/types/lib/model';

class SequelizeHelper {
  static create<M extends Model>(
    model?: { new (): M } & typeof Model,
    options?: object
  ) {
    return model?.create(options);
  }

  static findAndCountAll<M extends Model>(
    model?: { new (): M } & typeof Model,
    options?: FindAndCountOptions
  ) {
    return model?.findAndCountAll(options);
  }

  static authenticate(sequelize?: Sequelize) {
    return sequelize?.authenticate();
  }

  static sync<M extends Model>(model?: { new (): M } & typeof Model) {
    return model?.sync();
  }
}

export { SequelizeHelper };
