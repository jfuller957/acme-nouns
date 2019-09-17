const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost/acme-nouns');

const Person = conn.define('person', {});

const Place = conn.define('place', {});

const Thing = conn.define('thing', {});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
};

syncAndSeed();
