 export const navbarParams = {
	options: [
        { id: "apps-options", label: "Apps" },
        { id: "settings-options", label: "Settings" },
    ],
};

export const appMenuParams = {
	options: [
		{ id: "past-24hr", label: "Volume Past 24hr", to: "/#/24hrvolume" },
		// { id: "normalized", label: "Normalized Price", to: "/normalized" },
		// {id: "coin-info", label: "Coin Info", to: "/coininfoapp"},
		{ id: "coin-quote", label: "Coin Quote", to: "/#/coinquote" },
	],
};

export const chartParams = {
	xParam: 'cryptocurrency',
	xParamType: 'categorical',
	xParamFormat: 'none',
	yParam: 'vol24HourTo',
	yParamType: 'linear',
	yParamFormat: 'currency',
	toTimestamp: false,
	multiple: true,
	normalize: false,
};

// Label params:
export const labelParams = {
	chartTitle: `Past 24hr Volume`,
	xLabel: `${chartParams.xParam}`,
	yLabel: `${chartParams.yParam}`
};