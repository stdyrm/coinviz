// TEMPLATE COMPONENT

// switching units: 
// IF CRYPTO UNITS: compare fiat to fiat volumes (eg. USD in BTC vs EUR in BTC)
// IF FIAT UNITS: compare crypto to crypto volumes (eg. BTC in USD vs XRP in USD)

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// style
import { FormControlLabel, Checkbox, Button, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	unitSelectorContainer: {
		display: 'flex', 
		flexDirection: 'column',
		marginTop: '1rem',
	},
	unitLabels: {
		color: theme.palette.text.primary,
	}
}));

export const UnitSelector = (props) => {
	const { baseList, quoteList, handleChange, handleDeselect } = props;
	const classes = useStyles();
	
	return (
		<>
			{baseList
				&& Object.keys(baseList).map((base,i) => {
					return (
						<MenuItem>
							<FormControlLabel
								key={i}
								name={base}
								label={base}
								// checked={base.baseList}
								checked={baseList[base].selected}
								onChange={handleChange}
								control={<Checkbox />}
								className={classes.unitLabels}
							/>
						</MenuItem>
					)
				})
			}
			{quoteList
				? Object.keys(quoteList).map((quote,i) => {
					return (
						<MenuItem>
							<FormControlLabel
								key={quote}
								name={quote} 
								label={quote}
								checked={quote.quoteList}
								onChange={handleChange}
								control={<Checkbox />}
							/>
						</MenuItem>
					)
				})
				: <></>
			}
		</>
	)
};

UnitSelector.propTypes = {
	baseList: PropTypes.object, // object of base currencies 
	quoteList: PropTypes.oneOfType([ // object of quote currencies, false if none
		PropTypes.object,
		PropTypes.bool
	]), 
	handleChange: PropTypes.func, // change function
};