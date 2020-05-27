// WRAPPER COMPONENT (ChartLine)
// purpose: define scales, axes, draw chart axes and labels
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// components
import { ChartLine } from '../../../components/charts/ChartLine';

// context
import { DimensionContext } from '../../../components/context/DimensionContext';

// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	axes: {
		color: theme.palette.text.primary
	}
}));

export const NormalizedChart = (props) => {
	const { data, chartParams, labelParams } = props;
	const {chartDimensions} = useContext(DimensionContext);
	const classes = useStyles();


	return (
		<>
			{data
				? <>
					<ChartLine
						data={data}
						chartParams={chartParams}
						labelParams={labelParams} 
					/>
				</>
				: <h2>No chart data</h2>
			}
		</>
	)
};

NormalizedChart.propTypes = {
	data: PropTypes.object,
	chartParams: PropTypes.object,
	labelParams: PropTypes.object,
};