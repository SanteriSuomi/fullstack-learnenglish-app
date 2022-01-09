const express = require("express");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();

/**
 * Use cross-origin resource sharing
 */
app.use(cors());
/**
 * Deliver frontend
 */
app.use(express.static(path.resolve(__dirname, "../client/build")));
/**
 * Parse application/json in request body
 */
app.use(bodyParser.json());

/**
 *	Start server by listening to a specific port, which is injected from environment (or default is used).
 */
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

/**
 * GET HTTP command (get all word pairs).
 */
app.get("/wordpairs", async (req, res) => {
	db.authenticate(req.query.username, req.query.password)
		.then(() => {
			db.getAll()
				.then((result) => {
					res.status(202);
					res.send({
						msg: result,
					});
				})
				.catch((error) => {
					res.status(401);
					res.send({
						msg: error,
					});
				});
		})
		.catch((error) => {
			res.status(401);
			res.send({
				msg: error,
			});
		});
});

/**
 * POST HTTP command (insert a new word pair).
 */
app.post("/wordpairs", async (req, res) => {
	db.authenticate(req.query.username, req.query.password)
		.then(() => {
			db.insert(req.query.english, req.query.finnish)
				.then((result) => {
					res.status(202);
					res.send({
						msg: result,
					});
				})
				.catch((error) => {
					res.status(401);
					res.send({
						msg: error,
					});
				});
		})
		.catch((error) => {
			res.status(401);
			res.send({
				msg: error,
			});
		});
});

/**
 * PUT HTTP command (set word pair as completed).
 */
app.put("/wordpairs", async (req, res) => {
	db.authenticate(req.query.username, req.query.password)
		.then(() => {
			db.setCompleted(req.query.id, req.query.completed)
				.then((result) => {
					res.status(202);
					res.send({
						msg: result,
					});
				})
				.catch((error) => {
					res.status(401);
					res.send({
						msg: error,
					});
				});
		})
		.catch((error) => {
			res.status(401);
			res.send({
				msg: error,
			});
		});
});

/**
 * DELETE HTTP command (delete a word pair).
 */
app.delete("/wordpairs", async (req, res) => {
	db.authenticate(req.query.username, req.query.password)
		.then(() => {
			// If the query contains the all variable, delete all word pairs from the database.
			if (req.query.all !== undefined) {
				db.deleteAll()
					.then((result) => {
						res.status(202);
						res.send({
							msg: result,
						});
					})
					.catch((error) => {
						res.status(401);
						res.send({
							msg: error,
						});
					});
			} else {
				db.delete(req.query.id)
					.then((result) => {
						res.status(202);
						res.send({
							msg: result,
						});
					})
					.catch((error) => {
						res.status(401);
						res.send({
							msg: error,
						});
					});
			}
		})
		.catch((error) => {
			res.status(401);
			res.send({
				msg: error,
			});
		});
});

/**
 * GET HTTP command used for authentication before using any of the other commands.
 */
app.get("/authenticate", async (req, res) => {
	db.authenticate(req.query.username, req.query.password)
		.then((result) => {
			res.status(202);
			res.send({
				msg: result,
			});
		})
		.catch((error) => {
			res.status(401);
			res.send({
				msg: error,
			});
		});
});

/**
 * Send front-end instead if API is not accessed, to allow front-end and back-end to co-exist.
 */
app.get("*", (_, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
