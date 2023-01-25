const bodyParser = require('body-parser')
const express = require('express');
const http = require('http');

const app = express();
app.use(bodyParser())
const broker_port = 8002;


app.post('/send',(req, res) =>{

    res.statusCode = 200;
    const {dest, message } = req.body;

    res.setHeader('Content-Type', 'text/plain');

    if(dest !== undefined && dest !==''){
        let requestTime = new Date().toTimeString();
        res.send(`sending message...to ${dest} at ${requestTime}`);

        setTimeout(() =>{
            sendingMessage(dest,message)
        },1000)
    }
    else{
        res.send(`incorrect params`);
    }


})

//send message to the right server
const sendingMessage = (dest, message) =>{
    let portDest = 8000;

    if(dest !=='server1'){
        portDest = 8001;
    }
    const options = {
        hostname: dest,
        port: portDest,
        path: `/${message}`,

    };

    const req = http.get(options, (res) => {
        console.log(`sending to  http://${options.hostname}:${portDest}${options.path}`);
        res.on('data', (data) => {
            console.log("message recieved from :",data.toString());
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();
}

app.get('/',(req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('hello broker');
})

app.listen(broker_port,() => {
    console.log(`Broker running at http://localhost:${broker_port}`);
});