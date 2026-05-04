const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ace.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS part_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    part_id INTEGER,
    manufacturing TEXT,
    physics TEXT,
    chemistry TEXT,
    mathematics TEXT
  )`);
});

module.exports = db;