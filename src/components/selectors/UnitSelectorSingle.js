// switching units: 
// IF CRYPTO UNITS: compare fiat to fiat volumes (eg. USD in BTC vs EUR in BTC)
// IF FIAT UNITS: compare crypto to crypto volumes (eg. BTC in USD vs XRP in USD)

import React, { useState } from 'react'

// util
import { cryptoList, fiatList } from '../util/requestParams';

// style
import { Grid, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	unitSelectorContainer: {
		display: 'flex', 
		flexDirection: 'column',
		marginTop: '1rem',
	}
}));

export const UnitSelectorSingle = (props) => {
	const { baseType, units, handleBaseType, handleBase, handleQuote, cryptoParams } = props;
	const classes = useStyles();
	const [baseType, setBaseType] = useState("crypto");

	const [units, setUnits] = useState({
		base: 'BTC',
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
		<Grid container className={classes.unitSelectorContainer}>
			<FormControl>
				<FormLabel component="legend">Base Units
					<RadioGroup aria-label="units" value={baseType} onChange={handleBaseType}> 
						<FormControlLabel value="fiat" control={<Radio />} label="Fiat" />
						<FormControlLabel value="crypto" control={<Radio />} label="Crypto" />
					</RadioGroup>
				</FormLabel>
			</FormControl>
			<FormControl>
				<InputLabel id="base-selector">Show volume of:</InputLabel>
					<Select labelId="base-selector" value={units.base} onChange={handleBase}>
						{baseType === "fiat"
							? Object.keys(fiatList).map((d,i) => {
								return <MenuItem key={d} value={d}>{d}</MenuItem>
							})
							: Object.keys(cryptoList).map((d,i) => {
								return <MenuItem key={d} value={d}>{d}</MenuItem>
							})
						}
					</Select>
			</FormControl>
			<FormControl>
				<InputLabel id="quote-selector">in units:</InputLabel>
					<Select labelId="quote-selector" value={units.quote} onChange={handleQuote}>
						{baseType === "fiat"
							? Object.keys(cryptoList).map((d,i) => {
								return <MenuItem key={d} value={d}>{d}</MenuItem>
							})
							: Object.keys(fiatList).map((d,i) => {
								return <MenuItem key={d} value={d}>{d}</MenuItem>
							})
						}
					</Select>
			</FormControl>
		</Grid>
	)
};