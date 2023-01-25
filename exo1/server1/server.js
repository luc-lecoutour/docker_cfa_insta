require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');

const app = express();
app.use(bodyParser())
const port_serv = 8000; // || process.env.PORT_SERV;


app.get('/ping',(req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.send('server1...ping ok');

    setTimeout( ()=>{
        fetchBack();
    },1000)

})

const fetchBack = () =>{

    let data = JSON.stringify({
        dest: 'server2',
        message : 'pong'
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
    res.send('hello server1');
})


app.listen(port_serv,() => {
    console.log(`Server1 running at http://localhost:${port_serv}/ping`);
});