import React, { useState, useEffect } from 'react';

// components
import { Navbar, AppTitle } from "../sharedComponents/navigation";
import { Chart24Hr } from './charts/Chart24Hr';

// functions
import { getApiData } from "./data/getApiData";

// params
import { navbarParams, appMenuParams } from "./appParams";

// style
import { Grid, Toolbar } from '@material-ui/core';
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
			marginTop: theme.spacing(2),
			display: "flex",
			justifyContent: "center",
			height: "40vh",
			width: "95vw",
			[theme.breakpoints.up("md")]: {
				height: "70vh"
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
				<Toolbar />
				<AppTitle title="Volume Past 24hr" variant="h6" divider="none" />
				<Grid container className={classes.chartWrapper}>
					{data
						&& Object.keys(fiatList).map(fiat => (
							<Chart24Hr
								key={fiat}
								data={data[fiat]}
								fiat={fiat}
								cryptoList={Object.keys(cryptoList)} 
							/>
					))}
				</Grid>
			</div>
		</>
	);
};