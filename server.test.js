const test = require('node:test');
const assert = require('node:assert');
const http = require('http');

// Simple test to ensure the server module executes and export logic exists
// We will test the health endpoint using an HTTP request.
test('Server healthcheck returns 200 OK', async (t) => {
    // Start the server specifically for the test on a random port
    const { server } = require('./server.js');

    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;

    return new Promise((resolve, reject) => {
        http.get(`http://localhost:${port}/health`, (res) => {
            try {
                assert.strictEqual(res.statusCode, 200, 'Status should be 200');

                let data = '';
                res.on('data', chunk => { data += chunk; });
                res.on('end', () => {
                    assert.strictEqual(data, 'OK', 'Body should be OK');
                    // Stop the server so the test exits cleanly
                    server.close();
                    resolve();
                });
            } catch (err) {
                server.close();
                reject(err);
            }
        }).on('error', (err) => {
            server.close();
            reject(err);
        });
    });
});
