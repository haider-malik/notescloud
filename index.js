const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

connectToMongo();
const app = express();
const port = process.env.PORT || 3001;

//using cors so that cors policy doesn't block fetching
app.use(cors());
//middleware so that we can get response in json format in the console
app.use(express.json());

// Using an external router so that all code should not be in a single file and become unmanagable
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// request to be made on / to get Hello haider
// app.get("/", (req, res) => {
// 	res.send("Hello Haider!");
// });

if (process.env.NODE_ENV == "production") {
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, './client/build/index.html'), (err)=>{
      if(err) res.status(500).send(err)
    });
	});
}

// Starting the server
app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});
