import axios from "axios";

export const getApiData = async (cryptoList, fiatList) => {
	return axios.post("/getvolume24hr", {
			cryptoList,
			fiatList
		})
		.then(res => {
			const data = res.data.RAW;
			// clean/rearrange/filter data
			let revData = [];

			Object.keys(fiatList).forEach(f => {
				Object.keys(cryptoList).forEach(d => {
					revData[f]
						? revData[f].push(
							{
								cryptocurrency: d,
								vol24Hour: data[d][f].CONVERSIONTYPE === "direct" ? data[d][f].VOLUME24HOUR : NaN,
								vol24HourTo: data[d][f].CONVERSIONTYPE === "direct" ? data[d][f].VOLUME24HOURTO : NaN
							}
						)
						: revData[f] = [
							{
								cryptocurrency: d,
								vol24Hour: data[d][f].CONVERSIONTYPE === "direct" ? data[d][f].VOLUME24HOUR : NaN,
								vol24HourTo: data[d][f].CONVERSIONTYPE === "direct" ? data[d][f].VOLUME24HOURTO : NaN
							}
						]
				});
			});
			return revData;
		});
};