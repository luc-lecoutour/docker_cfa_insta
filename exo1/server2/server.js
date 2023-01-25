require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
app.use(bodyParser());
const port_client = 8001//process.env.PORT_CLIENT;


app.get('/pong',(req, res) =>{
    res.statusCode = 200;

    res.setHeader('Content-Type', 'application/json');

    res.send('server2...pong ok');

    setTimeout( ()=>{
        fetchBack();
    },1000)

})

const fetchBack = () =>{

    let data = JSON.stringify({
        dest: 'server1',
        message : 'ping'
    });

    const options = {
        hostname: 'broker',
        port: 8002,
        path: '/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    let request = http.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}, data from ${options.hostname}:${options.port}`);

        res.on('data', (data) => {
            console.log(data.toString());
        });
    });

    request.write(data);

    request.on('error', (error) => {
        console.error(error);
    });

    request.end();

}

app.get('/',(req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('hello server2');
})

app.listen(port_client,() => {
    console.log(`Server2 running at http://localhost:${port_client}/pong`);
});