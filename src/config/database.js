require('dotenv');

module.exports = {
  "username": process.env.PGUSER,
  "password": process.env.PGPASSWORD,
  "database": process.env.PGDATABASE,
  "host": "127.0.0.1",
  "dialect": "postgres",
  "define": {
    timestamps: true
  }
}