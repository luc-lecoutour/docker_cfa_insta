require('dotenv').config();
const express = require('express');
const app = express();

const http = require('http');

const port_serv = 8000//process.env.PORT_SERV;
const port_client = 8001//process.env.PORT_CLIENT;

const hostname = '172.17.0.3'; // hostname adresse for server1

app.get('/pong',(req, res) =>{
    res.statusCode = 200;

    res.setHeader('Content-Type', 'application/json');
    res.json({'response':'server2 ping'});

    const options = {
        hostname: hostname,
        port: port_serv,
        path: '/ping',
        method: 'GET'
    };

    let request = http.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}, data from ${options.hostname}:${port_serv}`);

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
    res.send('hello server2');


})

app.listen(port_client,() => {
    console.log(`Server2 running at http://localhost:${port_client}/pong`);
});