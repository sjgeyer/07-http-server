'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
// const cowsay = require('cowsay');

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('testing routes', () => {
  describe('testing /', () => {
    test('should respond with status 200', () => {
      return superagent.get(':5000/')
        .then((res) => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
