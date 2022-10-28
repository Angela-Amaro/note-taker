const express = require('express');
const path = require('path');
const fs = require('fs');
let dubs = require('./db/db.json');
const squid = require('uniqid');
const { application } = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.static(`public`));

app.get(`/`,(req,res) => res.sendFile(path.join(__dirname, `./public/index.html`)));

app.get(`/api/notes`,(req,res) => res.json(dubs));

app.get(`/notes`,(req,res) => res.sendFile(path.join(__dirname, `./public/notes.html`)));

