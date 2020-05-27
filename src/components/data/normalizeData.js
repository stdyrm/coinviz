import { extent } from 'd3';

export const normalizeData = (data, base, quote, normalize=true) => {

	const priceRange = extent(data, d => d.close);

	data.forEach((d,i) => {
		data[i].baseCurr = base;
		data[i].quoteCurr = quote;
		if (normalize) {
			data[i].normalizedClose = (d.close / priceRange[1] * 100);
		}
	});

	return data;
};