const debug = process.env.DEBUG
  ? require('debug')('labofolio:context')
  : () => {};

import { Sequelize } from 'sequelize';

import { MysqlConfig, DB } from './shared/types';
import { SequelizeHelper } from './helper';
import models from './models/mysql';

class Context {
  private _mysql?: Sequelize;
  public _db: DB;

  constructor() {
    debug('Context is initialized');
    this._db = {};
  }

  async initStore(mysql: MysqlConfig): Promise<void> {
    this._mysql = new Sequelize(
      mysql.database,
      mysql.username,
      mysql.password,
      mysql.options
    );

    await this._mysql.authenticate().then(() => {
      debug('mysql connected');
    });
  }

  initModels() {
    // set
    if (this._mysql instanceof Sequelize) {
      this._db.users = models.users.factory(this._mysql);
      this._db.blogs = models.blogs.factory(this._mysql);
    }
  }

  async syncModels() {
    // sync
    await SequelizeHelper.sync(this._db.users);
    await SequelizeHelper.sync(this._db.blogs);
  }

  getMysql(): Sequelize | undefined {
    return this._mysql;
  }
}

export default new Context();
