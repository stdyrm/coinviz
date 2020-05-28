import * as d3 from 'd3';

const api = process.env.REACT_APP_API_CC;

export const getApiData = async (cryptoList, fiatList) => {
	return d3.json(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Object.keys(cryptoList).join(',')}&tsyms=${Object.keys(fiatList).join(',')}&api_key=${api}`)
		.then(res => {
			const data = res.RAW;
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
			console.log('imported data');
			return revData
		});
};