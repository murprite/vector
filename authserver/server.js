import http from "http"
import prisma from "../lib/prisma";

const server = http.createServer((req, res) => {
 
  res.writeHead(200, {
    'Content-Type': 'textplain; charset=UTF-8'
  });
  res.end('Hello, world!');
});
 
server.listen(1488, '0.0.0.0', () => {
  console.log('Start NodeJS Server on http 0.0.0.0:3000');
});