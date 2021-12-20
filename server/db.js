const mysql = require("mysql");
require("dotenv").config();

class DB {
	constructor() {
		let config = {
			host: process.env.host,
			user: process.env.user,
			password: process.env.pass,
			database: process.env.db,
			connectionLimit: 10,
		};
		this.pool = mysql.createPool(config);
	}

	authenticate(username, password) {
		const sql = `SELECT * FROM Admins WHERE Username = ${this.pool.escape(
			username
		)} AND Password = ${this.pool.escape(password)};`;
		return new Promise((resolve, reject) => {
			this.pool.query(sql, (err, results, fields) => {
				if (err) {
					console.log(err);
					reject("Something went wrong with the request");
				} else {
					if (results && results.length >= 1) {
						resolve("Accepted");
					} else {
						reject("Could not authenticate");
					}
				}
			});
		});
	}

	getAll() {
		return new Promise((resolve, reject) => {
			this.pool.query(
				"SELECT * FROM WordPairs",
				(err, results, fields) => {
					if (err) {
						console.log(err);
						reject("Something went wrong with the request");
					} else {
						resolve(JSON.parse(JSON.stringify(results)));
					}
				}
			);
		});
	}
}

module.exports = new DB();
