projectData = {city:'paris',date:'5/22/2022'}

var path = require('path')
const express = require('express')
const app = express()
app.use(express.static('dist'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());








// designates what port the app will listen to for incoming requests
app.listen(8085, function () {
    console.log('Example app listening on port 8085!')
})



// GET route
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};


app.post('/add', callBack);

function callBack(req,res){
    res.send(req.body)
  projectData = req.body;
};