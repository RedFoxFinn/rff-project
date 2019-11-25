// rff-demo utils.test.js
// project backend utils tests

const config = require('../utils/config');

describe('config tests', () => {
  test('dummy', async () => {
    const env = process.env.NODE_ENV === 'test' ? 'dummy' : 'not dummy';
    expect(env).toBe('dummy');
  });
  test('env', async () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
  test('port', async () => {
    expect(config.port).toBe(4010);
  });
});

