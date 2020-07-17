const express = require('express');
const morgan = require('morgan');
const {urlencoded, json} = require('body-parser');
const {findUser, fetchIdFromPath} = require('./users');
const app = express();

app.use(morgan('dev'));
app.use(urlencoded({extended: true}));
app.use(json());

app.get('/user/:id', async (req, res) => {
    const id = fetchIdFromPath(req.url);
    try {
        const user = await findUser(id);
        res.status(200).send(JSON.stringify(user));
    } catch (err) {
        res.status(500).send('could not find user' + err);
    }
});

app.delete('/user/:id', async (req, res) => {
    const id = fetchIdFromPath(req.url);
    try {
        res.status(204).send(JSON.stringify(id));
    } catch (err) {
        res.status(500).send('could not delete user' + err);
    }
});

module.exports = app;
