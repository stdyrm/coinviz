import React, { useState, useEffect } from 'react'

// components
import { Navbar, AppTitle } from "../sharedComponents/navigation";
import { Chart24Hr } from './charts/Chart24Hr';

// functions
import { getApiData } from "./data/getApiData";

// params
import { navbarParams, appMenuParams } from "./appParams";

// style
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// util
import { cryptoList, fiatList } from '../sharedResources/reference/requestParams';

export const App24HourVol = () => {
	const [data, setData] = useState(null);

	const useStyles = makeStyles((theme) => ({
		appWrapper: {
			marginTop: theme.spacing(2),
		},
		chartWrapper: {
			textAlign: "center",
		},
		gridItem: {
			width: "100%",
			height: "100%",
			padding: 0,
			margin: 0,
			[theme.breakpoints.up("xl")]: {
				width: "50%",
			}
		},
	}));
	
	const classes = useStyles();

	useEffect(() => {
		getApiData(cryptoList, fiatList)
			.then(res => setData(res));
	}, []);

	return (
		<>
			<Navbar 
				navbarParams={navbarParams}
				appMenuParams={appMenuParams}
			/>
			<div className={classes.appWrapper}>
				<AppTitle title="Volume Past 24hr" variant="h6" divider="none" />
				<Grid container className={classes.chartWrapper}>
					{data
						&& Object.keys(fiatList).map(fiat => (
								<Grid item key={fiat} className={classes.gridItem}>
									<Chart24Hr
										data={data[fiat]}
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