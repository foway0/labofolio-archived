import * as Debug from 'debug';
const debug = Debug('labofolio:context');

import { Sequelize } from 'sequelize';

import { MysqlConfig } from './shared/types';

class Context {
  private mysql: Sequelize | undefined;

  async initStore(mysql: MysqlConfig): Promise<void> {
    this.mysql = new Sequelize(
      mysql.database,
      mysql.username,
      mysql.password,
      mysql.options
    );

    await this.mysql.authenticate().then(() => {
      debug('mysql connected');
    });
  }
}

export default Context;
