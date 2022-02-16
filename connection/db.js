const { Pool } = require('pg')

const dbPool = new Pool({
    database: 'direct_in',
    port: 5432,
    user: 'postgres',
    password: '776653455' 
})


module.exports = dbPool
