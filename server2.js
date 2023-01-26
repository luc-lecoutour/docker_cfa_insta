require('dotenv').config()
const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = parseInt(process.env.PORT) || 4568
let broker;
const registry = process.env.REGISTRY || 'http://localhost:8080';
const address = process.env.ADDRESS || 'http://localhost';

const register = (adress, registry) => {
    fetch(registry + '/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:'server2', adresse:adress.toString() }),
    }).
    then(response => response.json())
        .then( res =>{
            console.log(res);
        }).catch(err =>{
        console.log(err)
    })
}

const getBrokerAddresse =  () =>{
    let options = {
        method:'GET',
    }

    fetch(registry+'/', options)
        .then(data => data.json())
        .then(json => {
                console.log('trying to get adresse broker..')
                broker =  json.filter(broker => broker.name.toLowerCase() === 'broker');
                if (broker.length>=2){
                    return broker = broker[0]
                }
                if(broker.length === 0 ){
                    return  broker = null;
                }

                return broker=broker[0];
            }
        ).catch(err => console.log('error : ',err))

}

const fetchBack = async () => {
    if (!broker) await getBrokerAddresse()
    if (!broker) return setTimeout(fetchBack, 1000);

    return fetch(broker.adresse + '/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dest: 'server1', message: 'ping' }),
    })
        .then(res => res.json())
        .then( json => console.log(json))
}

app.get('/pong', (req, res) => {
    setTimeout(fetchBack, 1000)
    res.setHeader('Content-Type', 'text/plain');
    res.send('server2/pong...ok')
})

app.get('/',(req, res) =>{
    res.status(200);
    res.send('hello server2');
})


app.listen(port, () => {
    console.log(`Example app listening at ${address}:${port}`)
})

//register our server with adresse+port
register(`${address}:${port}`, registry);
getBrokerAddresse();