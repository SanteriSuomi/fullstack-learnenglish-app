const express = require("express");
const path = require("path");
const db = require("./db");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

// API
app.get("/test", async (req, res) => {
	let response = await db.getAll();
	res.send(response);
});

// If API is not accessed, send frontend instead
app.get("*", (_, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
