import React from 'react';
import clsx from "clsx";
import PropTypes from "prop-types";

// style
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	dialog: {},
	button: {},
}));

export const AlertDialog = (props) => {
	const { openDialog, setOpenDialog, classes, innerProps } = props;

	const defaultClasses = useStyles(classes);

	return (
		<Dialog
			open={openDialog.open}
			onClose={() => setOpenDialog({open: false, message: ""})}
			className={clsx(defaultClasses.dialog, classes.dialog)}
			{...innerProps.dialog}
		>
			<DialogContent>
				{openDialog.message && openDialog.message}
				{props.children}
			</DialogContent>
			<DialogActions>
				<Button 
					variant="outlined" 
					autoFocus 
					onClick={() => setOpenDialog({open: false, message: ""})} 
					className={clsx(defaultClasses.button, classes.button)}
					{...innerProps.button}
				>
					Okay
				</Button>
			</DialogActions>
		</Dialog>
	)
};

AlertDialog.propTypes = {
	openDialog: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		message: PropTypes.string,
	}),
	setOpenDialog: PropTypes.func.isRequired,
	classes: PropTypes.object,
	innerProps: PropTypes.object,
};

AlertDialog.defaultProps = {
	classes: {
		dialog: {},
		button: {},
	},
	innerProps: {
		dialog: {},
		button: {},
	}
};
