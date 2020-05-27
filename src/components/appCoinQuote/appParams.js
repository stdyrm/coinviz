export const chartParamsAggBar = {
    chartType: "bar",
    toTimestamp: null,
    multiple: true,
    normalize: false,
    xParam: {
        // x-axis
        output: "x-axis",
        type: "band",
        format: "none",
        selected: "pair",
        options: ["pair"],
    },
    yParam: {
        // y-axis
        output: "y-axis",
        type: "linear",
        format: "none",
        selected: "profitLossPercent",
        options: [
            "profitLoss",
            "profitLossPercent",
            "quoteQty",
            "currQuoteQty",
        ],
    },
};

export const labelParamsAggBar = {
    chartTitle: "Aggregated profit/loss",
    xLabel: "Currency pair",
    yLabel: "Profit/loss (%)",
};

// navbar params: 
export const navbarParams = {
	options: [
        { id: "apps-options", label: "Apps" },
        { id: "settings-options", label: "Settings" },
    ],
};

export const appMenuParams = {
	options: [
		{ id: "past-24hr", label: "Volume Past 24hr", to: "/" },
		// { id: "normalized", label: "Normalized Price", to: "/normalized" },
		// {id: "coin-info", label: "Coin Info", to: "/coininfoapp"},
		{ id: "coin-quote", label: "Coin Quote", to: "/coinquoteapp" },
	],
};