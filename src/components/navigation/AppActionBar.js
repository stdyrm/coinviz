import React from 'react';

// style
import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	toolbar: {
		marginRight: "auto",
		padding: 0,
		alignItems: "center",
	},
}));

export const AppActionBar = (props) => {
	const classes = useStyles();

	return (
		<>
			<Toolbar className={classes.toolbar}>
				{props.children}
			</Toolbar>
		</>
	)
};