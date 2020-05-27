import { createMuiTheme } from '@material-ui/core/styles';
import "./styles.css";

const lightTheme = {
	palette: {
		type: "light",
		primary: {
			main: "#00ccb9",
			contrastText: "#3c3c3c",
		},
		secondary: {
			main: "#f93b32",
		},
		background: {
			default: "#fff"
			
		},
		text: {
			primary: "#3c3c3c",
		},
	},
};

const darkTheme = {
	palette: {
		type: "dark",
		primary: {
			main: "#02eee6",
		},
		secondary: {
			main: "#f04d98",
			alt: "#ffa07a",
		},
		background: {
			default: "#252131",
			paper: "#3d354f",
			light: "#493f5e",
		},
		text: {
			primary: "#fff",
		},
	},
}

export const theme = createMuiTheme({
	typography: {
		fontSize: 14,
		fontFamily: [
			"poppinslight",
			"ralewaymedium",
			"Helvetica",
			"Arial"
		].join(','),
		title: {
			fontFamily: [
				"poppinsbold",
				"HelveticaNeue-Bold",
				"Arial Bold"
			].join(','),
			fontWeight: 700,
		},
		tab: {
			textTransform: 'none',
			fontWeight: 700,
			fontSize: '1rem',
		},
	},
	tooltip: {
		'&:hover': {
			cursor: 'pointer',
			opacity: 1,
		},
	},
	chartContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	overrides: {
		MuiMenu: {
			paper: {
				borderRadius: "2px"
			}
		},
		MuiButton: {
			root: {
				transition: "all 0.3s",
				"&:hover": {
					backgroundColor: "transparent",
				},
			}
		},
	}
});

export const getTheme = (currTheme, darkMode) => {
	if (darkMode) {
		return createMuiTheme({
			...currTheme,
			palette: {
				...darkTheme.palette
			},
			actionButton: {
				...currTheme.actionButton,
				color: darkTheme.palette.text.primary,
				"&:hover": {
					backgroundColor: "transparent",
				},
			},
			overrides: {
				...currTheme.overrides,
				MuiTooltip: {
					tooltip: {
						backgroundColor: darkTheme.palette.secondary.main,
					},
				},
			},
		});
	} else {
		return createMuiTheme({
			...currTheme,
			palette: {
				...lightTheme.palette
			},
			actionButton: {
				...currTheme.actionButton,
				color: lightTheme.palette.text.primary,
				"&:hover": {
					backgroundColor: "transparent",
				},
			},
			overrides: {
				...currTheme.overrides,
				MuiTooltip: {
					tooltip: {
						backgroundColor: lightTheme.palette.secondary.main,
					},
				},
			},
		});
	}
};