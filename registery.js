require('dotenv').config()
const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = parseInt(process.env.PORT) || 8080

app.use(bodyParser())

let data = []

app.get('/', (req, res) => {
    res.send(JSON.stringify(data))
})

app.post('/register', (req, res) => {

    //get servername in array
    const findServerName = data.filter( s => s.name === req.body.name && s.adresse ===  req.body.adresse );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if(findServerName.length>0){
        return res.json({'registration':'Already registred'})
    }
    else{
        data.push(req.body)
    }

    return res.json({'registration':'success'})
    //console.log(data)


})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})