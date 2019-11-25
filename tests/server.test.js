// rff-demo server.test.js
// project backend server tests

describe('server tests', () => {
  test('dummy', async () => {
    const env = process.env.NODE_ENV === 'test' ? 'dummy' : 'not dummy';
    expect(env).toBe('dummy');
  });
});