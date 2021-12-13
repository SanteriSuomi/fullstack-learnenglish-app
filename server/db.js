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

	getAll() {
		return new Promise((resolve, reject) => {
			this.pool.query("SELECT * FROM test", (err, results, fields) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(JSON.stringify(results)));
				}
			});
		});
	}
}

module.exports = new DB();
