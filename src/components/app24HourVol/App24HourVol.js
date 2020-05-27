import React, { useState, useEffect } from 'react'
import * as d3 from 'd3';

// components
import { Navbar } from "../navigation/Navbar";
import { AppTitle } from "../navigation/AppTitle";
import { Chart24Hr } from './Chart24Hr';

// params
import { navbarParams, appMenuParams } from "./appParams";

// style
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// util
import { cryptoList, fiatList } from '../util/requestParams';

const api = process.env.REACT_APP_API_CC;

const wrapper = {
	wrapperWidth: window.innerWidth * .8,
	wrapperHeight: window.innerHeight * .8,
	margin: {
	  top: 50,
	  right: 10,
	  bottom: 60,
	  left: 50,
	},
  };
  
  const bounds = {
	width: wrapper.wrapperWidth - wrapper.margin.left - wrapper.margin.right,
	height: wrapper.wrapperHeight - wrapper.margin.top - wrapper.margin.bottom,
  };

const chartparams = {
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
const labelParams = {
	chartTitle: `Past 24hr Volume`,
	xLabel: `${chartparams.xParam}`,
	yLabel: `${chartparams.yParam}`
};

export const App24HourVol = () => {
	const [data, setData] = useState(null);

	const { wrapperWidth, wrapperHeight, margin } = wrapper;
	const { width, height } = bounds;

	const useStyles = makeStyles((theme) => ({
		appWrapper: {
			marginTop: theme.spacing(2),
		},
		chartWrapper: {
			textAlign: "center",
		},
		gridItem: {
			width: "100%",
			height: wrapperHeight,
			padding: 0,
			margin: 0,
		},
	}));
	
	const classes = useStyles();

	const getData = async () => {
		d3.json(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Object.keys(cryptoList).join(',')}&tsyms=${Object.keys(fiatList).join(',')}&api_key=${api}`)
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
				setData(revData);
				console.log('imported data');
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Navbar 
				navbarParams={navbarParams} 
				appMenuParams={appMenuParams} 
			/>
			<div container className={classes.appWrapper}>
				<AppTitle title="Volume Past 24hr" variant="h6" divider="none" />
				<Grid container className={classes.chartWrapper}>
					{data
						&& Object.keys(fiatList).map(fiat => (
								<Grid item key={fiat} className={classes.gridItem}>
									<Chart24Hr
										wrapper={wrapper}
										bounds={bounds}
										data={data[fiat]}
										chartparams={chartparams}
										labelParams={labelParams}
										fiat={fiat}
										cryptoList={Object.keys(cryptoList)} 
									/>
								</Grid>
					))}
				</Grid>
			</div>
		</>
	);
};