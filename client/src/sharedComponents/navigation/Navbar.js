import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

// components
import { AppTitle } from "./AppTitle";
import { Settings } from "../settings/Settings";
import { ParamDrawer } from "./ParamDrawer";
import { AppMenuList } from "./AppMenuList";

// style
import {
	AppBar,
    Toolbar,
    IconButton,
    Menu,
    Button,
	Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
	buttonRoot: {
		minWidth: 0,
	},
    navbarWrapper: {
        marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},
	appbar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: theme.palette.background.default,  
	},
    toolbar: {
        alignItems: "center",
		justifyContent: "space-between",
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		[theme.breakpoints.up("md")]: {
			marginLeft: theme.spacing(4),
			marginRight: theme.spacing(4),
		},
		[theme.breakpoints.up("lg")]: {
			marginLeft: theme.spacing(6),
			marginRight: theme.spacing(6),
		},
    },
    title: {
		textDecoration: "none",
		marginRight: "auto"
    },
    tab: {
		...theme.typography.tab,
		color: theme.palette.text.primary,
		padding: 0,
		margin: theme.spacing(2),
		borderBottom: "1px solid transparent",
		borderRadius: "0px",
		transition: "all 0.3s",
        "&:hover": {
			color: theme.palette.primary.main,
			borderBottom: `1px solid ${theme.palette.primary.main}`,
		},
	},
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
			backgroundColor: "transparent",
			color: theme.palette.primary.alt,
        },
        padding: 0,
    },
    drawerIcon: {
        height: "30px",
        width: "30px",
        color: theme.palette.text.primary,
        "&:hover": {
			color: theme.palette.primary.alt,
        },
    },
}));

export const Navbar = props => {
	const { navbarParams, appMenuParams, persistent } = props;
	const settingsRef = useRef();
	const appMenuRef = useRef();

    // styles
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
	const [mobileOpen, setMobileOpen] = useState(false);

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
	};
	
	const handleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};
	
    return (
        <div className={classes.navbarWrapper}>
			<AppBar position="fixed" className={classes.appbar}>
            <Toolbar disableGutters className={classes.toolbar}>
                <AppTitle
                    title="CoinViz"
                    divider="none"
					href="/coinviz"
					variant="h4"
					className={classes.title}
                />
				<span>
					<Hidden smDown>
						{navbarParams.options.map(option => (
							<Button
								key={option.id}
								id={option.id}
								onClick={handleMenu}
								className={classes.tab}
								classes={{ root: classes.buttonRoot }}
							>
								{option.label}
							</Button>
						))}
					</Hidden>
					<Hidden mdUp>
						<IconButton
							onClick={handleDrawer}
							className={classes.drawerIconContainer}
						>
							<MenuIcon className={classes.drawerIcon} />
						</IconButton>
					</Hidden>
				</span>
            </Toolbar>
			</AppBar>
            <Menu
                anchorEl={anchorEl}
                open={
					anchorEl 
						? Boolean(anchorEl.id === "apps-options") 
						: false
                }
				onClose={handleMenu}
            >
				<AppMenuList 
					appMenuParams={appMenuParams}
					ref={appMenuRef}
				/>
            </Menu>
            <Menu
                anchorEl={anchorEl}
                open={
                    anchorEl
                        ? Boolean(anchorEl.id === "settings-options")
                        : false
                }
				onClose={handleMenu}
            >
				<Settings ref={settingsRef} />
            </Menu>
			<ParamDrawer 
				mobileOpen={mobileOpen} 
				handleDrawer={handleDrawer} 
				appMenuParams={appMenuParams}
				persistent={persistent}
			>
				{props.children}
			</ParamDrawer>
        </div>
    );
};

Navbar.propTypes = {
	navbarParams: PropTypes.object.isRequired,
	appMenuParams: PropTypes.object.isRequired,
	persistent: PropTypes.bool
}