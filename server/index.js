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
app.get("/test", async (req, res) => {
	res.header("Access-Control-Allow-Origin", "<origin>");
	let result = await db.getAll();
	console.log(result);
	res.send(result);
});

// If API is not accessed, send frontend instead
app.get("*", (_, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
