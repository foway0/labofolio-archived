import test from 'ava';
import * as supertest from 'supertest';

import ApiApplication from '../../../../src/app/api/app'
import env from '../../../../src/shared/environment';

test.serial('ping → pong', async t => {
  const app = new ApiApplication(env.SERVICE_HOST, env.SERVICE_PORT);
  await app.init();

  const result = await supertest(app.app).get('/ping').expect(200);

  t.is(result.text, 'pong');
});