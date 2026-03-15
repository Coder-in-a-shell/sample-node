const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200);
        return res.end('OK');
    }
    res.writeHead(200);
    res.end('Hello from Production-Grade Node.js!');
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});