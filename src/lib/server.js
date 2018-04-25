'use strict';

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');
// const logger = require('./logger');
const faker = require('faker');

const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      // WORKING CORRECTLY :D
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const projectDesc = 'This app creates a cow saying things';
        const homePage = `<!DOCTYPE html><html><head><title>cowsay</title></head><body<header><nav><ul><li><a 
href="/cowsay">cowsay</a></li></ul></nav></header><main>${projectDesc}</main></html>`;
        res.write(homePage);
        res.end();
        return undefined;
      }
      // WORKING CORRECTLY :D
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/cowsay') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let message;
        if (parsedRequest.url.query.text) {
          message = parsedRequest.url.query.text;
        } else { message = faker.random.word(); }
        const cowsayText = cowsay.say({ text: message });
        const cowPage = `<!DOCTYPE html><html><head><title>cowsay</title></head><body><h1>cowsay</h1><pre>${cowsayText}</pre></body></html>`;
        res.write(cowPage);
        res.end();
        return undefined;
      }

      // WORKING MAYBE? IDK WHAT THE REQUIREMENTS ARE.
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsay') {
        // if (!parsedRequest.url.query.text) {
        //   res.writeHead(400, { 'Content-Type': 'application/json' });
        //   res.write('{ "error": "invalid request: text query required" }');
        //   res.end();
        //   return undefined;
        // }
        const cowsaysText = cowsay.say({ text: parsedRequest.url.query.text });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(`{ "content": "${JSON.stringify(cowsaysText)}"}`);
        res.end();
        return undefined;
      }

      // NOT WORKING
      if (parsedRequest.method === 'POST' && parsedRequest.url.pathname === '/api/cowsay') {
        // if (!parsedRequest.body) {
        //   res.writeHead(400, { 'Content-Type': 'application/json' });
        //   res.write('{ "error": "invalid request: body required" }');
        //   res.end();
        //   return undefined;
        // }
        // if (!parsedRequest.url.query) {
        //   res.writeHead(400, { 'Content-Type': 'application/json' });
        //   res.write('{ "error": "invalid request: text query required" }');
        //   res.end();
        //   return undefined;
        // }
        const cowsayText = cowsay.say({ text: parsedRequest.url.query.text });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(`{ "content": "${JSON.stringify(cowsayText)}" }`);
        res.end();
        return undefined;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('NOT FOUND');
      res.end();
      return undefined;
    })
    .catch((err) => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('BAD REQUEST', err);
      res.end();
      return undefined;
    });
});

server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
