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

	insert(english, finnish) {
		console.log();
		return new Promise((resolve, reject) => {
			this.pool.query(
				`SELECT * FROM WordPairs WHERE English=${this.pool.escape(
					english
				)} OR Finnish=${this.pool.escape(finnish)}`,
				(err, results, fields) => {
					if (results.length > 0) {
						reject(
							`${english} or ${finnish} already exist in the database`
						);
					} else {
						this.pool.query(
							`INSERT INTO WordPairs (English, Finnish) VALUES (${this.pool.escape(
								english
							)}, ${this.pool.escape(finnish)})`,
							(err, results, fields) => {
								if (err) {
									console.log(err);
									reject(
										"Something went wrong with the request"
									);
								} else {
									resolve("Insertion completed");
								}
							}
						);
					}
				}
			);
		});
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			this.pool.query(
				`DELETE FROM WordPairs WHERE id=${this.pool.escape(id)}`,
				(err, results, fields) => {
					if (err) {
						console.log(err);
						reject("Something went wrong with the request");
					} else {
						resolve("Deletion successful");
					}
				}
			);
		});
	}

	deleteAll() {
		return new Promise((resolve, reject) => {
			this.pool.query(`DELETE FROM WordPairs`, (err, results, fields) => {
				if (results.affectedRows <= 0) {
					reject("Cannot delete, database is empty");
				} else if (err) {
					console.log(err);
					reject("Something went wrong with the request");
				} else {
					resolve("Deletion of all Word Pairs successful");
				}
			});
		});
	}
}

module.exports = new DB();
