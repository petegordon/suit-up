var sqlite3 = require('sqlite3').verbose();
DatabaseConnection = new sqlite3.Database('./desire.db');

module.exports = DatabaseConnection;
