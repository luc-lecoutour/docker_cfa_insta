require('dotenv').config();
const http = require('http');

const port_serv = 8000//process.env.PORT_SERV;
const port_client = 8001//process.env.PORT_CLIENT;

const express = require('express');
const app = express();

const hostname = 'server2'; //hostname adresse for server2




app.get('/ping',(req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({'response':'server1 pong'});

    const options = {
        hostname: hostname,
        port: port_client,
        path: '/pong',
        method: 'GET'
    };

    let request = http.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}, data from ${options.hostname}:${port_client}`);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    request.on('error', (error) => {
        console.error(error);
    });

    request.end();

})

app.get('/',(req, res) =>{
    res.statusCode = 200;

    res.setHeader('Content-Type', 'text/plain');
    res.send('hello server1');
})

app.listen(port_serv,() => {
    console.log(`Server1 running at http://localhost:${port_serv}/ping`);
});