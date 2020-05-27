import React, { useState, useEffect } from "react";

// functions 
import { getApiData } from "../components/appCoinQuote/data/getApiData";

export const useCalculator = props => {
	const { currentCard, setCurrentCard } = props;
	
	getApiData(currentCard)
		.then(res => {
			const conversionRate = res[0].data[currentCard.baseUnits][currentCard.quoteUnits];
			const quoteQty = res[0].data[currentCard.baseUnits][currentCard.quoteUnits] * parseFloat(currentCard.baseQty);
			const currConversionRate = res[1].data[currentCard.baseUnits][currentCard.quoteUnits];
			const currQuoteQty = res[1].data[currentCard.baseUnits][currentCard.quoteUnits] * parseFloat(currentCard.baseQty);
			setCurrentCard({
				...currentCard,
				conversionRate,
				quoteQty,
				currConversionRate,
				currQuoteQty,
				profitLoss: currQuoteQty - quoteQty,
				profitLossPercent: ((currQuoteQty - quoteQty) / quoteQty * 100)
			});
		}
	);

	useEffect(() => {
		getApiData(currentCard);
	}, []);

	return currentCard;
};
