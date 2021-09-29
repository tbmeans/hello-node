const http = require('http');
const page = require('./minpage.js')

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-type', 'text/html');
	res.end(page.template());
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});