import React from 'react';
import PropTypes from "prop-types";

// components
import { Bars } from "../../sharedComponents/charts";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	rect: {
	}
}))

export const Bars24Hr = (props) => {
	const { chartParams, data, scales, bounds } = props;
	const classes = useStyles();

	return (
		<Bars
			chartParams={chartParams}
			data={data}
			scales={scales}
			bounds={bounds}
			classes={{
				rect: classes.rect,
			}}
		/>
	)
};

Bars24Hr.propTypes = {
	chartParams: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	scales: PropTypes.object,
	bounds: PropTypes.object.isRequired
};