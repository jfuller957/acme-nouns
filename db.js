const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;


const conn = new Sequelize('postgres://localhost/acme_nouns');

const Person = conn.define('person', {
  name: {
    type: STRING,
    unique: true,
    notNull: true,
    notEmpty: true
  }
});

const Place = conn.define('place', {
  name: {
    type: STRING,
    unique: true,
    notNull: true,
    notEmpty: true
  }
});

const Thing = conn.define('thing', {
  name: {
    type: STRING,
    unique: true,
    notNull: true,
    notEmpty: true
  }
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });

  const persons = [
    { name: 'Larry' },
    { name: 'Curly' },
    { name: 'Moe' }
  ];

  const places = [
    { name: 'Los Angeles' },
    { name: 'Oceanside' },
    { name: 'DEATH VALLEY' }
  ];

  const things = [
    { name: 'patience' },
    { name: 'time' },
    { name: 'headshot' }
  ];

  await Promise.all(persons.map( person => Person.create(person)));
  await Promise.all(places.map( place => Place.create(place)));
  await Promise.all(things.map( thing => Thing.create(thing)));

};

syncAndSeed();
