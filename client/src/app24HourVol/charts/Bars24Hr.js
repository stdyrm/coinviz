import React, { useContext } from 'react';
import PropTypes from "prop-types";

// components
import { Bars } from "../../sharedComponents/charts";

// context
import { DimensionsContext } from "../context/DimensionsContext";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	rect: {
	}
}))

export const Bars24Hr = (props) => {
	const { chartParams, data, scales } = props;
	const { dim } = useContext(DimensionsContext);
	const { height, width } = dim;
	const classes = useStyles();

	return (
		<Bars
			chartParams={chartParams}
			data={data}
			scales={scales}
			height={height}
			width={width}
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
};