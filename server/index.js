const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

// API
app.get("/test", (req, res) => {
	res.json({ message: "Hello from server!" });
});

// If API is not accessed, send frontend instead
app.get("*", (_, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
