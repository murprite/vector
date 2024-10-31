let { PrismaClient } = require('@prisma/client');
let http = require('http');

const prisma = new PrismaClient()

let server = http.createServer(function (req, res) {
  let body = [];
  req
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', async () => {
      body = Buffer.concat(body).toString();
      body = JSON.parse(body);
      
      if( req.url === '/auth-check' && body.jwt) {
        let user = await prisma.user.findMany({where: {
          jwt: body.jwt
        }});
        if(user[0]) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(`{"response": true}`);
        } else {
          res.writeHead(404, {'Content-Type': 'application/json'});
          res.end('{ "response" : "No such user" }');
        }
      }
    });
});



server.listen(1488);
console.log('Server running on port 1488');