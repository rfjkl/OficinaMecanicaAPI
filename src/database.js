import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'app',
  password: 'app',
  database: 'oficina',
});

export default db;