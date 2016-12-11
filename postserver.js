http = require('http');

const server = http.createServer((req, res) => {
    console.log("method: " + req.method);
        if (req.method == 'POST') {


            req.on('data', function (data) {
                console.log("data:\n" + data);
                try {
                    ip = JSON.parse(data).ip;
                } catch (err) {
                    console.log(err);
                }
                
            });

            res.end('POST');

        } else if (req.method == 'GET') {
            res.end('GET');
        } else {
            res.end('OK');
        }
});

server.listen(8081);
console.log("Running at Port 8081");