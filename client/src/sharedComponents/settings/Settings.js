import React, { useContext } from "react";

// context
import { ThemeContext } from "../../sharedResources/context/ThemeContext";

// style
import { Tooltip, Switch, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Brightness4Icon from "@material-ui/icons/Brightness4";

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
		},
	},
}));

export const Settings = React.forwardRef((props, ref) => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const classes = useStyles();

    return (
		<MenuItem className={classes.darkModeSettings} ref={ref}>
			<Tooltip title="Dark mode">
				<Brightness4Icon />
			</Tooltip>
			<Switch
				checked={darkMode}
				onChange={() => setDarkMode(!darkMode)}
				name="Dark mode switch"
			/>
		</MenuItem>
    );
});
