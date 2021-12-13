const express = require("express");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();

// Use cross-origin resource sharing
app.use(cors());
// Deliver frontend
app.use(express.static(path.resolve(__dirname, "../client/build")));
// Parse application/json in request body
app.use(bodyParser.json());

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

app.get("/wordpairs", async (req, res) => {
	db.authenticate(req.query.username, req.query.password)
		.then(() => {
			db.getAll()
				.then((result) => {
					res.status(202);
					res.send({
						error: "",
						data: result,
					});
				})
				.catch((error) => {
					res.status(401);
					res.send({
						error: error,
						data: "",
					});
				});
		})
		.catch((error) => {
			res.status(401);
			res.send({
				error: error,
				data: "",
			});
		});
});

app.get("/authenticate", async (req, res) => {
	db.authenticate(req.query.username, req.query.password)
		.then(() => {
			res.status(202);
			res.send({
				error: "",
				data: true,
			});
		})
		.catch((error) => {
			res.status(401);
			res.send({
				error: error,
				data: "",
			});
		});
});

// If API is not accessed, send frontend instead
app.get("*", (_, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
