export const convertToReadable = (trans) => {
	// for presenting transaction data in table, etc. but original transaction values remain intact.
	let readableTrans = {...trans};
	let baseUnitsLocale;

	try {
		baseUnitsLocale = Intl.NumberFormat(trans.baseUnits, { style: "currency", currency: trans.baseUnits }).format(trans.baseQty)
	} catch {
		baseUnitsLocale = trans.baseQty.toLocaleString();
	}
	const converter = {
		date: !trans.date ? null : typeof trans.date === "string" ? trans.date : String(trans.date.toLocaleDateString()),
		baseQty: baseUnitsLocale,
		quoteQty: Intl.NumberFormat(trans.quoteUnits, { style: "currency", currency: trans.quoteUnits }).format(trans.quoteQty),
		currQuoteQty: Intl.NumberFormat(trans.quoteUnits, { style: "currency", currency: trans.quoteUnits }).format(trans.currQuoteQty),
		currQuotePerUnit: Intl.NumberFormat(trans.quoteUnits, { style: "currency", currency: trans.quoteUnits }).format(trans.currQuotePerUnit),
		profitLoss: Intl.NumberFormat(trans.quoteUnits, { style: "currency", currency: trans.quoteUnits }).format(trans.profitLoss),
		profitLossPercent: ((trans.currQuoteQty - trans.quoteQty) / trans.quoteQty * 100).toFixed(2) + "%",
		costPerUnit: Intl.NumberFormat(trans.quoteUnits, { style: "currency", currency: trans.quoteUnits, }).format(trans.costPerUnit),
		currCostPerUnit: Intl.NumberFormat(trans.quoteUnits, { style: "currency", currency: trans.quoteUnits }).format(trans.currCostPerUnit),
		weightedAverageCost: Intl.NumberFormat(trans.quoteUnits, { style: "currency", currency: trans.quoteUnits, }).format(trans.weightedAverageCost),
	};

	Object.keys(trans).forEach(k => {		
		if (Object.keys(converter).includes(k)) {
			readableTrans[k] = converter[k];
		} else {
			readableTrans[k] = trans[k]
		}
	});

	return readableTrans;
};