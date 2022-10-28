const express = require('express');
const path = require('path');
const fs = require('fs');
let dubs = require('./db/db.json');
const squid = require('uniqid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.static(`public`));

app.get(`/`,(req,res) => res.sendFile(path.join(__dirname, `/public/index.html`)));

app.get(`/api/notes`,(req,res) => res.json(dubs));

app.get(`/notes`,(req,res) => res.sendFile(path.join(__dirname, `/public/notes.html`)));

app.post('/api/notes', (req, res) =>{

    const {title,text}=req.body
    if (title && text) {
      const note = {
        title,
        text: squid(),
      };
  
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
  
          const formatNote = JSON.parse(data);
  
          formatNote.push(note);
          dubs = formatNote;
  
          fs.writeFile(
            './db/db.json',
            JSON.stringify(formatNote, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully created a note')
          );
        }
      });
      const status = { status:`sucess, yay!`,
         body:note,
        }
    console.log(status);
    res.json(status);
    }
    else {
        res.json(`no notes, how sad `)
    }
});

app.listen(PORT,() => 
    console.log(`App is listening at http://localhost:${PORT}`)
);