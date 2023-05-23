const knexObject = require('knex');
const pg = require('pg');

pg.types.setTypeParser(20, Number)

const knexConfig = {
    client: 'postgresql',
    connection: {
        database: 'aiDietPlannerDb',
        user:     'postgres',
        password: '@Pranjal7'
    },
    pool: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 2000, // free resources are destroyed after this many milliseconds
        reapIntervalMillis: 1000, // how frequent to check for idle resources to destroy
    },
};


const knex = knexObject(knexConfig);

module.exports = knex;
