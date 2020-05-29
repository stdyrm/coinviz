const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");

const getVolume24Hr = require("./routes/getVolume24Hr");
const getCoinQuote = require("./routes/getCoinQuote");

const corsOptions = {
	origin: "https://coin-viz.herokuapp.com",
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(getVolume24Hr);
app.use(getCoinQuote);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req,res) => {
		res.sendFile(path.resovle(__dirname, "client", "build", "index.html"));
	})
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));