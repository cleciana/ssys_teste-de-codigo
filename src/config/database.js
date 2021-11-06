require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.DATABASE,
    "host": "localhost",
    "dialect": "postgres",
    "define": {
      "timestamps":true
    }
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false 
      }
    },
    "define": {
      "timestamps":true
    }
  }
}