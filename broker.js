require('dotenv').config()
const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = parseInt(process.env.PORT) || 8003
const bodyParser = require('body-parser')
const {response} = require("express");
const e = require("express");
app.use(bodyParser())
const registry = process.env.REGISTRY || 'http://localhost:8080';
const address = process.env.ADDRESS || 'http://localhost';

var ServerAdresses;

app.get('/',(req, res) => {
    res.status(200);
    res.send('hello broker');
})

app.post('/send', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    const {dest, message} = req.body;
    let date = new Date();
    sendMessage({dest, message}).then(res => res.text()).then(response =>  res.json(response+' time : '+date))

})

const sendMessage = async ({dest, message}) =>{
    const destinataire = ServerAdresses.find( server => server.name===dest);
    if(!destinataire){
         await getServerAdresse();
         return  sendMessage({dest, message});
    }

    console.log(destinataire)

    return fetch(destinataire.adresse + '/' + message, {
        method: 'GET',
    })


}

const register = (adress, registry) => {
    fetch(registry + '/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:'broker', adresse:adress.toString() }),
    }).
    then(response => response.json())
        .then( res =>{
            console.log(res);
        }).catch(err =>{
        console.log(err)
    })
}

const getServerAdresse = async () =>{
    let options = {
        method:'GET',
    }

    await fetch(registry+'/', options)
        .then(data => data.json())
        .then(json => {
                ServerAdresses = json;
            }
        ).catch(err => console.log('error : ',err))

}


app.listen(port, () =>{
    console.log(`Broker app listening at http://localhost:${port}`)
})

register(`${address}:${port}`, registry);
getServerAdresse();