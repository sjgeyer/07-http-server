'use strict';

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');

const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const projectDesc = 'This app takes creates a cow saying things';
        const homePage = `<!DOCTYPE html><html><head><title>cowsay</title></head><body<header><nav><ul><li><a 
href="/cowsay">cowsay</a></li></ul></nav></header><main>${projectDesc}</main></html>`;
        res.write(projectDesc);
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/cowsay') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cowPage = `<!DOCTYPE html><html><head><title>cowsay</title></head><body><h1>cowsay</h1><pre>${cowsay.say({ text: req.query.text })}</pre></body></html>`;
        res.write(cowPage);
        res.end();
        return undefined;
      }

      // if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsay') {
      //   res.writeHead(200, { 'Content-Type': 'application/json' });
      //   const cowsayText = cowsay.say({ text: parsedRequest.url.query.text });
      //   res.write(JSON.stringify(parsedRequest.body));
      // }

      if (parsedRequest.method === 'POST' && parsedRequest.url.pathname === '/api/cowsay') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(parsedRequest.body));
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
