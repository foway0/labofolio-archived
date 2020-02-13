const debug = process.env.DEBUG
  ? require('debug')('labofolio:context')
  : () => {};

import { Sequelize } from 'sequelize';

import { MysqlConfig } from './shared/types';

class Context {
  private _mysql?: Sequelize;

  constructor() {
    debug('Context is initialized');
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

  getMysql(): Sequelize | undefined {
    return this._mysql;
  }
}

export default new Context();
