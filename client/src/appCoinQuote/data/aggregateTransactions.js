export const aggregateTransactions = transactionArray => {
    let pivot = {};

    transactionArray.forEach(trans => {
        let basePair = `${trans.baseUnits}-${trans.quoteUnits}`;

        if (!pivot[basePair]) {
            pivot[basePair] = {
                pair: basePair,
                baseUnits: trans.baseUnits,
                quoteUnits: trans.quoteUnits,
                baseQty: trans.baseQty,
                quoteQty: trans.quoteQty,
                currQuoteQty: trans.currQuoteQty,
                currQuotePerUnit: trans.currQuoteQty / trans.baseQty,
                weightedAverageCost: trans.costPerUnit,
                profitLoss: trans.profitLoss,
                profitLossPercent: trans.profitLossPercent,
            };
        } else {
            pivot[basePair] = {
                ...pivot[basePair],
                baseQty: pivot[basePair].baseQty + trans.baseQty,
                quoteQty: pivot[basePair].quoteQty + trans.quoteQty,
                currQuoteQty: pivot[basePair].currQuoteQty + trans.currQuoteQty,
                weightedAverageCost:
                    (pivot[basePair].quoteQty + trans.quoteQty) /
                    (pivot[basePair].baseQty + trans.baseQty),
                profitLoss: pivot[basePair].profitLoss + trans.profitLoss,
                profitLossPercent:
                    ((pivot[basePair].currQuoteQty +
                        trans.currQuoteQty -
                        (pivot[basePair].quoteQty + trans.quoteQty)) /
                        (pivot[basePair].quoteQty + trans.quoteQty)) *
                    100,
            };
		}
    });

    return pivot;
};
