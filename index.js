const express = require('express');
const path = require('path');



const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/flowers2019.db');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/flowers', (req,res) => {
    db.all(`SELECT FlOWERS.COMNAME FROM FLOWERS`, (err,row) => {
        console.log(row);
        var list = row[0]
        res.send(list)
    })
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);