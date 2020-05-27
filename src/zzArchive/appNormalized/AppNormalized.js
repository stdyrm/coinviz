// APP COMPONENT
// COMPARE cryptocurrency to cryptocurency volumes, prices over time 
// Normalized prices -> as % of all time high
// Normalized volumes -> as % of volumes of top 3

import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import { AppTitle } from "../../components/navigation/AppTitle";
import { SelectorMenu } from './selectors/SelectorMenu';
import { DataImportDailyPairOHLCV } from '../../components/data/DataImportDailyPairOHLCV';
import { NormalizedChart } from './chart/NormalizedChart';
import { Labels } from '../../components/charts/Labels';

// context
import { DimensionContext } from '../../components/context/DimensionContext';

// util
import { cryptoList, fiatList } from '../../components/util/requestParams';

// style
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	chartContainer: {
		...theme.chartContainer,
		backgroundColor: theme.palette.background.default
	},
}));

// Static parameters (no user input)
// Chart params: define params for drawing axes and chart
const chartParams = {
	xParam: 'time',
	xParamType: 'date',
	xParamFormat: 'timestamp',
	yParam: 'normalizedClose',
	yParamType: 'linear',
	yParamFormat: 'currency',
	toTimestamp: new Date(2018, 2, 1).getTime(),
	multiple: true,
	normalize: true,
};

// Label params:
const labelParams = {
	chartTitle: "Cryptocurrency prices (relative to high)",
	xLabel: "Date",
	yLabel: "Price as % of High"
};

export const AppNormalized = () => {
	const classes = useStyles();
	const [data, setData] = useState(null);
	const [cryptoParams, setCryptoParams] = useState(cryptoList);
	const [fiatParams, setFiatParams] = useState(fiatList);
	const {chartDimensions, setChartDimensions} = useContext(DimensionContext);

	const handleChange = (e) => {
		setCryptoParams({
			...cryptoParams,
			[e.target.name]: {
				...cryptoParams[e.target.name], 
				selected: !cryptoParams[e.target.name].selected}
		});
	};

	useEffect(() => {
		console.log(data);
	}, [data]);

	const handleDeselect = () => {
		// Object.keys(cryptoParams).forEach(c => {
		// 	setCryptoParams({
		// 		...cryptoParams,
		// 		[c]: {
		// 			...cryptoParams[c],
		// 			selected: false
		// 		}
		// 	});
		// });
		console.log(Object.values(cryptoParams));
	};

	return (
		<div container>
			<AppTitle title="Normalized prices" variant="h6" divider="none" />
			<SelectorMenu
				cryptoParams={cryptoParams}
				handleChange={handleChange}
				handleDeselect={handleDeselect}
			/>
			<Grid container className={classes.chartContainer}>
				<DataImportDailyPairOHLCV
					setData={setData}
					chartParams={chartParams}
					cryptoParams={cryptoParams} 
					fiatParams={fiatParams}
				/>
				{data
					? <>
						<NormalizedChart
							data={data}
							chartParams={chartParams}
							labelParams={labelParams} 
							cryptoParams={cryptoParams}
							fiatParams={fiatParams}
						/>
					</>
					: <></>
				}
			</Grid>
		</div>
	);
};