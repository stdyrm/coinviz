import React from 'react';
import PropTypes from "prop-types";

// styles
import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	chartTitle: {
		...theme.typography.title,
		fontSize: "1.25rem",
		fill: theme.palette.text.primary
	},
	chartAxis: {
		...theme.typography.title,
		fill: theme.palette.text.primary,
		fontSize: "1rem",
		[theme.breakpoints.down("sm")]: {
			fontSize: ".8rem",
		},
	},
}));

export const LabelsAggregated = (props) => {
	const { labelParams, wrapper, bounds } = props;
	const { xLabel, yLabel } = labelParams;
	const { margin } = wrapper;
	const { height, width } = bounds;

	const classes = useStyles();
	const theme = useTheme();
	const mqdSmall = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<text
				className={classes.chartAxis}
				textAnchor="middle"
				transform={mqdSmall 
					? `translate(${margin.left + width / 2}, ${margin.top + height + 65})` 
					: `translate(${margin.left + width / 2}, ${margin.top + height + 40})`
				}
			>
				{xLabel}
			</text>
			<text
				className={classes.chartAxis}
				textAnchor="middle"
				transform={`translate(${margin.left - 40}, ${height / 2}) rotate(-90)`}
			>
				{yLabel}
			</text>
		</>
	)
};

LabelsAggregated.propTypes = { 
	labelParams: PropTypes.object.isRequired, 
	wrapper: PropTypes.object.isRequired, 
	bounds: PropTypes.object.isRequired 
};