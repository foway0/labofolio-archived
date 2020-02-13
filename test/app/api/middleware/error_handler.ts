import test from 'ava';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';


import { errorHandler } from '../../../../src/middleware/error_handler';

test('errorHandler - 404', t => {
  const err = {
    status: 404
  };
  const req = mockReq();
  const res = mockRes();
  const next = sinon.spy();

  errorHandler(err, req, res, next);

  t.false(next.called);
  t.assert(res.status, '404');
  t.assert(res.send, 'what??? (╯°□°）╯︵ ┻━┻');
});

test('errorHandler - 500', t => {
  const err = {
    status: 1
  };
  const req = mockReq();
  const res = mockRes();
  const next = sinon.spy();

  errorHandler(err, req, res, next);

  t.false(next.called);
  t.assert(res.status, '500');
});