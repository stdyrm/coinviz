import axios from "axios";

export const getApiData = async (payload) => {
	const ts = Math.round(new Date(payload.date).getTime() / 1000);
	const currTs = Math.round(new Date().getTime() / 1000);

	const response = await axios.all([
		axios.post("http://localhost:5000/getcoinquote", { 
			payload: payload, 
			timestamp: ts 
		}),
		axios.post("http://localhost:5000/getcoinquote", { 
			payload: payload, 
			timestamp: currTs
		})
	]);
	return response;
};