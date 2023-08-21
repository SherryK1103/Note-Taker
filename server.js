const express = require('express');
let app = express();
const path = require('path');
const DB ='/db/db.json';
const pathToDB = './db/db.json';
const PORT = process.env.PORT || 3001;
const fs = require('fs');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/** welcome page */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

/** notes page */
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

/** database path */
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, DB));
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    
    fs.readFile(pathToDB, (err, data) => {
        if(err) throw err;
        let newData = JSON.parse(data);
        newData.push(newNote);

        fs.writeFile(pathToDB, JSON.stringify(newData), err => {
            if(err) throw err;
            console.log('Data has been succesfully saved!');
        })
    })
    console.log('res --> ', res);
    res.redirect('/notes');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.listen(PORT, () => {
    console.log(`app listening to http://127.0.0.1:${PORT}/ `);
});