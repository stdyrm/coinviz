import axios from "axios";

const api = process.env.REACT_APP_API_CC;

export const getApiData = async (payload) => {
	const timestamp = Math.round(new Date(payload.date).getTime() / 1000);
	const currTimestamp = Math.round(new Date().getTime() / 1000);

	const response = await axios.all([
		axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${payload.baseUnits}&tsyms=${payload.quoteUnits}&ts=${timestamp}&calculationType=MidHighLow&api_key=${api}`),
		axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${payload.baseUnits}&tsyms=${payload.quoteUnits}&ts=${currTimestamp}&calculationType=MidHighLow&api_key=${api}`)
		]);
	return response;
};