const mysql = require("mysql");
require("dotenv").config();

class DB {
	constructor() {
		this.pool = mysql.createPool({
			host: process.env.host,
			user: process.env.user,
			password: process.env.pass,
			database: process.env.db,
			connectionLimit: 15,
		});
	}

	getAll() {
		return new Promise((resolve, reject) => {
			this.pool.query("SELECT * FROM test", (err, results, fields) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(JSON.parse(JSON.stringify(results)));
				}
			});
			// this.pool.getConnection((err, connection) => {
			// 	if (err) reject(err);
			// 	connection.query(
			// 		"SELECT * FROM test",
			// 		(err, results, fields) => {
			// 			connection.release();
			// 			if (err) reject(err);
			// 			resolve(JSON.parse(JSON.stringify(results)));
			// 		}
			// 	);
			// });
		});
	}
}

module.exports = new DB();
