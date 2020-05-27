import React, { useState, useEffect } from 'react';

// style
import { Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    displayContainer: {
		display: "flex",
        gridGap: theme.spacing(2),
	},
}));

export const DisplayTable = (props) => {
	
	const classes = useStyles();

	return (
		<Grid container className={classes.displayContainer}>
			{props.children}
		</Grid>
	)
};
