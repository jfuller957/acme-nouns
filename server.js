const express = require('express');
const db = require('./db');
const app = express();
const { Person, Place, Thing } = db.models;
const path = require('path');

app.get('/api/persons', (req, res, next)=> {
  Person.findAll()
    .then( persons => res.send(persons))
    .catch(next);
});

app.get('/api/persons/:id', (req, res, next)=> {
  Person.findByPk(req.params.id)
    .then( person => res.send(person))
    .catch(next);
});

app.get('/api/places', (req, res, next)=> {
  Place.findAll()
    .then( places => res.send(places))
    .catch(next);
});

app.get('/api/things', (req, res, next)=> {
  Thing.findAll()
    .then( things => res.send(things))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.syncAndSeed()
  .then(()=> {
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  });
