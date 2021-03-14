const http = require('http');
const fileStream = require('fs');

const port = 8000;

let html = fileStream.readFileSync('index.html');

var server = http.createServer(function(request, response) {
  // Handle requests here
  switch(request.url)
  {
    default:
      response.writeHead(404, 'Not Found');
      response.end();
      break;
    case '/text':
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write('Hellow World');  
      response.end();
      break;
    case '/json':
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify({
        ID: 1,
        Message: "hello world"
      }));
      response.end();
      break;
    case '/html':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('<html><body><center><h1>Hello World</h1></center></body></html>');
      response.end();
      break;
    case '/html-file':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(html);
      break;
  }
});

server.listen(port);

console.log("Node.js server is running at port: " + port);