const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;


const conn = new Sequelize('postgres://localhost/acme_nouns');

const Person = conn.define('person', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    notNull: true,
    notEmpty: true
  }
});

const Place = conn.define('place', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    notNull: true,
    notEmpty: true
  }
});

const Thing = conn.define('thing', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    notNull: true,
    notEmpty: true
  }
});

Person.belongsTo(Place);
Place.hasMany(Person);
Thing.belongsTo(Person);
Person.hasMany(Thing);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });

  const places = [
    { name: 'Los Angeles' },
    { name: 'Oceanside' },
    { name: 'DEATH VALLEY' }
  ];

  const [LA, OC, DV] = await Promise.all(places.map( place => Place.create(place)));

  const persons = [
    { name: 'Larry', placeId: LA.id },
    { name: 'Curly', placeId: OC.id },
    { name: 'Moe', placeId: DV.id }
  ];

  const [Larry, Curly, Moe] = await Promise.all(persons.map( person => Person.create(person)));
  const things = [
    { name: 'patience', personId: Larry.id },
    { name: 'time', personId: Curly.id },
    { name: 'headshot', personId: Moe.id }
  ];

  await Promise.all(things.map( thing => Thing.create(thing)));

};

module.exports = {
  syncAndSeed,
  models: {
    Person,
    Place,
    Thing
  }
};
