import React from 'react';
import clsx from "clsx";
import PropTypes from "prop-types";

// style
import { Button, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const AppMenuList = React.forwardRef((props, ref) => {
	const { appMenuParams, classes, innerProps } = props;
	const { options } = appMenuParams;

	const useStyles = makeStyles((theme) => ({
		list: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
		},
		button: {},
	}));

	const defaultClasses = useStyles(classes);
	
	return (
		<List
			className={clsx(defaultClasses.list, classes.list)}
			{...innerProps.list}
			ref={ref}
		>
			{options.map(option => (
				<Button
					className={clsx(defaultClasses.button, classes.button)}
					{...innerProps.button}
					key={option.id}
					href={option.to}
				>
					{option.label}
				</Button>
			))}
		</List>
	)
});

AppMenuList.propTypes = {
	appMenuParams: PropTypes.object.isRequired,
	classes: PropTypes.object,
	innerProps: PropTypes.object,
};

AppMenuList.defaultProps = {
	classes: {
		list: {},
		button: {}
	},
	innerProps: {
		list: {},
		button: {}
	},
};