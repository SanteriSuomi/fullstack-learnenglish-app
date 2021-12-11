const mysql = require("mysql");
require("dotenv").config();

class DB {
	constructor() {
		this.pool = mysql.createPool({
			connectionLimit: 15,
			host: process.env.host,
			user: process.env.user,
			password: process.env.pass,
			database: process.env.db,
		});
	}

	getAll() {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if (err) reject(err);
				connection.query(
					"SELECT * FROM test",
					(err, results, fields) => {
						connection.release();
						if (err) reject(err);
						resolve(results);
					}
				);
			});
		});
	}
}

module.exports = new DB();
