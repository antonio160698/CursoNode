const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let salida = {
        nombre: 'antonio',
        edad: 20,
        url: req.url
    }
    res.write(JSON.stringify(salida));
    res.end();
}).listen(8080);