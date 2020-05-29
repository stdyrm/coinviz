const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

const api = process.env.API_CC;

router.post("/getcoinquote", async (req, res) => {
	const { payload, timestamp } = req.body;

	try {
		const data = await axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${payload.baseUnits}&tsyms=${payload.quoteUnits}&ts=${timestamp}&calculationType=MidHighLow&api_key=${api}`)
		res.status(201).send(data.data)
	} catch (err) {
		res.status(400).send(err)
	}
})

module.exports = router;