import React, { useContext } from "react";

// context
import { ThemeContext } from "../context/ThemeContext";

// style
import { Tooltip, Switch, MenuItem, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    darkModeSettings: {
        marginRight: "auto",
	},
	saveSettings: {
        marginRight: "auto",
	},
	iconButton: {
		paddingLeft: 0,
		"&:hover": {
			backgroundColor: "transparent"
		}
	}
}));

export const Settings = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const classes = useStyles();

    return (
        <>
            <MenuItem className={classes.darkModeSettings}>
                <Tooltip title="Dark mode">
                    <Brightness4Icon />
                </Tooltip>
                <Switch
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    name="Dark mode switch"
                />
            </MenuItem>
			{/* <MenuItem className={classes.saveSettings}>
                <Tooltip title="Save settings">
					<IconButton className={classes.iconButton}>
                    	<SaveIcon />
					</IconButton>
                </Tooltip>
				<Typography>Save</Typography>
            </MenuItem> */}
        </>
    );
};
