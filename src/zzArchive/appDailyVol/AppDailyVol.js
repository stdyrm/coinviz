import React, { useState, useContext, useEffect } from 'react'
import * as d3 from 'd3';
import dotenv from 'dotenv';

// components
import { ChartDailyVol } from './ChartDailyVol';
import { UnitSelector } from '../../components/selectors/UnitSelector';
import { GetDailyVol }	from '../../components/data/GetDailyVol';

// context
import { DimensionContext } from '../../components/context/DimensionContext';

// style
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { wrapper, bounded } from '../../style/dimensions'; 

// dotenv.config();
// const api_key = process.env.API_KEY_CC;

const useStyles = makeStyles((theme) => ({
	chartContainer: {
		...theme.chartContainer,
		backgroundColor: theme.palette.background.default
	},
	chart: {
		// border: "1px solid black"
	}
}));

const AppDailyVol = () => {
	const [chartParams, setChartParams] = useState({					
		xParam: 'time',
		// yParam: 'total_volume_base'
		yParam: 'volumeto'
	});

	const classes = useStyles();
	const [chartData, setChartData] = useState(null);
	const [baseType, setBaseType] = useState("crypto");
	const [units, setUnits] = useState({
		base: ['BTC'],
		quote: 'USD'
	});

	const handleBaseType = (e) => {
		setBaseType(e.target.value);
		setUnits({base: units.quote, quote: units.base});
	};

	const handleBase = (e) => {
		setUnits({...units, base: e.target.value});
	};

	const handleQuote = (e) => {
		setUnits({...units, quote: e.target.value});
	};

	return (
		<Grid container className={classes.chartContainer}>
			{chartData
				? <Grid item className={classes.chart}>
					<ChartDailyVol 
						chartData={chartData}
						chartParams={chartParams}
						units={units}
						wrapper={wrapper}
						bounded={bounded}
					/>
				</Grid>
				: <div></div>
			}
			<Grid item>
				<UnitSelector 
					baseType={baseType} 
					units={units} 
					handleBase={handleBase} 
					handleQuote={handleQuote} 
					handleBaseType={handleBaseType} 
				/>
			</Grid>
			<GetDailyVol 
				units={units} 
				chartData={chartData} 
				setChartData={setChartData} 
			/>
		</Grid>
	);
};

export { DimensionContext, AppDailyVol };