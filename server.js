const http = require('http');

const server = http.createServer((req, res) => {
    // Basic structured JSON logging
    console.log(JSON.stringify({
        level: 'info',
        method: req.method,
        url: req.url,
        time: new Date().toISOString()
    }));

    if (req.url === '/health') {
        res.writeHead(200);
        return res.end('OK');
    }

    res.writeHead(200);
    res.end('Hello! The new feature branch has successfully reached production!');
});

if (require.main === module) {
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        console.log(JSON.stringify({
            level: 'info',
            message: `Server listening on port ${PORT}`,
            time: new Date().toISOString()
        }));
    });
}

// Graceful Shutdown Logic for Kubernetes updates
['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
        console.log(JSON.stringify({
            level: 'info',
            message: `${signal} received. Closing HTTP server...`,
            time: new Date().toISOString()
        }));
        server.close(() => {
            console.log(JSON.stringify({
                level: 'info',
                message: 'HTTP server closed.',
                time: new Date().toISOString()
            }));
            process.exit(0);
        });
    });
});

module.exports = { server }; // Export for test runner