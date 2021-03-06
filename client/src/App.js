import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// components
import { App24HourVol } from './app24HourVol/App24HourVol';
import { AppCoinQuote } from "./appCoinQuote/AppCoinQuote";

// context
import { ThemeContext } from "./sharedResources/context/ThemeContext";

// styles
import { CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme, getTheme } from './sharedResources/style/theme';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCalculator, faChartBar, faTable, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCalculator, faChartBar, faTable, faFileInvoice);

const useStyles = makeStyles((theme) => ({
	app: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		[theme.breakpoints.up("md")]: {
			marginLeft: theme.spacing(4),
			marginRight: theme.spacing(4),
		},
		[theme.breakpoints.up("lg")]: {
			marginLeft: theme.spacing(8),
			marginRight: theme.spacing(8),
		},
		margin: "0 auto",
		minWidth: 360, 
	},
}));

function App() {
	const classes = useStyles();
	const [darkMode, setDarkMode] = useState(true);

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			<ThemeProvider theme={getTheme(theme, darkMode)}>
				<CssBaseline />
					<div className={classes.app}>
						<Route path="/24hrvolume" render={() => <App24HourVol darkMode={darkMode} setDarkMode={setDarkMode} />} />
						<Route path="/coinquote" render={() => <AppCoinQuote darkMode={darkMode} setDarkMode={setDarkMode} />} />
						<Switch>
							<Redirect exact from="/" to="/coinquote" />
						</Switch>
					</div>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export default App;
