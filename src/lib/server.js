'use strict';

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');
// const logger = require('./logger');

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
        const cowsayText = cowsay.say({ text: parsedRequest.url.query.text });
        const cowPage = `<!DOCTYPE html><html><head><title>cowsay</title></head><body><h1>cowsay</h1><pre>${cowsayText}</pre></body></html>`;
        res.write(cowPage);
        res.end();
        return undefined;
      }

      // if (parsedRequest.method === 'GET' &&)
      // if (parsedRequest.method === 'POST' && parsedRequest.url.pathname === '/api/cowsay') {
      //   res.writeHead(200, { 'Content-Type': 'application/json' });
      //   res.write(JSON.stringify(parsedRequest.body));
      //   res.end();
      //   return undefined;
      // }

      // GET -- superagent.then.catch
      // POST --superagent.send.then.catch

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
