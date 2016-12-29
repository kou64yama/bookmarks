import test from 'ava';
import nock from 'nock';
import request from './request';

const user = {
  id: '5f6be3d2-8049-4e96-82f4-7c47e70131ee',
  username: 'test user',
};

test.before(() => {
  nock('http://localhost')
    .get('/users/1')
    .reply(200, user)
    // 404 Error
    .get('/404')
    .reply(404, { message: 'Page not found' });
});

test.after(() => {
  nock.restore();
});

test((t) => {
  t.is(typeof request.get, 'function');
  t.is(typeof request.post, 'function');
  t.is(typeof request.put, 'function');
  t.is(typeof request.del, 'function');
});

test('200 OK', async (t) => {
  const response = await request.get('http://localhost/users/1').send();
  t.deepEqual(response, user);
});

test('404 Error', async (t) => {
  const error = await t.throws(request.get('http://localhost/404').send());
  t.is(error.message, 'Not Found');
  t.deepEqual(error.body, { message: 'Page not found' });
});
