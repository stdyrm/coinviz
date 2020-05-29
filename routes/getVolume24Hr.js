const router = require("express").Router();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const api = process.env.API_CC;

router.post("/getvolume24hr", async (req, res) => {
	console.log("fetching data...");
	const { cryptoList, fiatList } = req.body;

	try {
		const data = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Object.keys(cryptoList).join(',')}&tsyms=${Object.keys(fiatList).join(',')}&api_key=${api}`)
		res.status(201).send(data.data);
	} catch (err) {
		res.status(400).send(err)
	}
});

module.exports = router;