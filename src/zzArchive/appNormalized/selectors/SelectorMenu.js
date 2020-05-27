import React, { useState, useEffect } from 'react';

// components
import { Selector } from "./Selector";

// style
import { Button, IconButton, Menu, MenuList, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles(theme => ({
	chartSettings: {
		backgroundColor: "transparent",
	},
	iconButton: {
		display: "block",
		marginLeft: "auto",
		"&:hover": {
			backgroundColor: "transparent",
		},
		color: theme.palette.text.primary,
	},
}));

export const SelectorMenu = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	
	const classes = useStyles();

	const handleMenu = (e) => {
		!anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
	};

	return (
		<div className={classes.chartSettings}>
			<IconButton onClick={handleMenu} className={classes.iconButton}>
				<AssessmentIcon />
			</IconButton>
			<Menu 
				anchorEl={anchorEl} 
				open={Boolean(anchorEl)}
				onClose={handleMenu}	
			>
				<Selector {...props} />
			</Menu>
		</div>
	)
};
