import React from 'react';
import clsx from "clsx";
import PropTypes from "prop-types";

// styles
import { Typography, Divider } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

export const AppTitle = (props) => {
	const { title, variant, align, divider, href, classes, innerProps } = props;

	const useStyles = makeStyles((theme) => ({
		root: {
			display: "flex",
			flexDirection: "row",
			alignContent: "center",
		},
		typography: {
			...theme.typography.title
		},
		divider: {
			backgroundColor: theme.palette.text.primary,
		},
	}));

	const theme = useTheme(); 
	const defaultClasses = useStyles();

	return (
		<React.Fragment 
			className={clsx(defaultClasses.root, classes.root)}
			{...innerProps.root}
		>
			{props.children}
			<Typography 
				className={clsx(defaultClasses.typography, classes.typography)} 
				align={align ? align : "left"}
				variant={variant}
				{...innerProps.typography}
			>
				{href 
					? <a 
						href={href} 
						style={{textDecoration: "none", color: theme.palette.text.primary}}
					>{title}</a> 
					: title
				}
			</Typography>
			{(!divider || divider === "true") 
				&& <Divider 
					className={clsx(defaultClasses.divider, classes.divider)} 
					{...innerProps.divider} 
				/>
			}
		</React.Fragment>
	)
};

AppTitle.propTypes = {
	title: PropTypes.string.isRequired, 
	variant: PropTypes.string, 
	align: PropTypes.string, 
	divider: PropTypes.string, 
	href: PropTypes.string, 
	classes: PropTypes.shape({
		typography: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		divider: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	}), 
	innerProps: PropTypes.shape({
		typography: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		divider: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	}),
};

AppTitle.defaultProps = {
	classes: {
		root: {},
		typography: {},
		divider: {}
	},
	innerProps: {
		root: {},
		typography: {},
		divider: {}
	},
};