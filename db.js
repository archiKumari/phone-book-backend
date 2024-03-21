const { Pool } = require('pg');

// Database connection pool configuration
const pool = new Pool({
    user: 'archi',
    host: 'localhost',
    database: 'phonebook',
    password: 'a',
    port: 5432,
  });

module.exports = pool;
