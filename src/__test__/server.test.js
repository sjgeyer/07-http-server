'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
// const cowsay = require('cowsay');

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('testing routes', () => {
  describe('testing /', () => {
    test('should respond with status 200', () => {
      const projectDesc = 'This app creates a cow saying things';
      const homePage = `<!DOCTYPE html><html><head><title>cowsay</title></head><body<header><nav><ul><li><a 
href="/cowsay">cowsay</a></li></ul></nav></header><main>${projectDesc}</main></html>`;
      return superagent.get(':5000/')
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(homePage);
        });
    });
  });
  describe('testing /cowsay', () => {
    test('should respond with status 200', () => {
      return superagent.get(':5000/cowsay')
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res).toHaveProperty('text');
        });
    });
  });

  // GET -- superagent.then.catch
  // POST --superagent.send.then.catch
});
