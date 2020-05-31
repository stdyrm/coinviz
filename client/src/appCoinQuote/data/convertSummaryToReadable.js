export const convertSummaryToReadable = (data) => {
	let readableAgg = {...data};

	const converter = {
		totalCost: Intl.NumberFormat(data.units, { style: "currency", currency: data.units }).format(data.totalCost),
		totalCurrValue: Intl.NumberFormat(data.units, { style: "currency", currency: data.units }).format(data.totalCurrValue),
		totalProfitLoss: Intl.NumberFormat(data.units, { style: "currency", currency: data.units }).format(data.totalProfitLoss),
		averageProfitLossPercent: ((data.totalCurrValue - data.totalCost) / data.totalCost * 100).toFixed(2) + "%",
	};

	Object.keys(data).forEach(k => {		
		readableAgg[k] = converter[k]
	});

	return readableAgg;
};