const express = require("express");
const mongoose = require("mongoose");
const Cards = require("./dbCards");
const cors = require("cors");

//app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:y6GA6HDO5jcXgoje@cluster0.dqrqw.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//middlewares
app.use(express.json());
app.use(cors());

//db config
mongoose.connect(connection_url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

//api endpoints
app.get("/", (req, res) => {
	res.status(200).send("hello MERN world");
});

app.post("/tinder/cards", (req, res) => {
	const dbCard = req.body;

	Cards.create(dbCard, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get("/tinder/cards", (req, res) => {
	Cards.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
