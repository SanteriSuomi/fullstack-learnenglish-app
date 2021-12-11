const express = require("express");
const path = require("path");
const db = require("./db");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

// API
app.get("/test", (req, res) => {
	res.header("Access-Control-Allow-Origin", "<origin>");
	db.getAll()
		.then((result) => res.send(result))
		.catch((error) => res.send(error));
});

// If API is not accessed, send frontend instead
app.get("*", (_, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
