const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200);
        return res.end('OK');
    }
    res.writeHead(200);
    // Change this line:
    // res.end('Hello from Production-Grade Node.js!');

    // To something new:
    res.end('Hello! The new feature branch has successfully reached production!');
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});