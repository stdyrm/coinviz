import React from 'react';

// components
import { AppTitle } from "./AppTitle";

// styles
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	componentWrapper: {
		display: "flex",
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	drawerTitle: {
		paddingTop: theme.spacing(3),
	}
}));

export const ParamDrawerSection = (props) => {
	const { title } = props;
	const classes = useStyles();

	return (
		<>
			<AppTitle title={title} variant="h6" className={classes.drawerTitle} />
			{props.children}
		</>
	)	
};

