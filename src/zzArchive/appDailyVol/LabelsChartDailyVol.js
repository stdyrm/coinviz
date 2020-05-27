import React from 'react'

// components
import { Labels } from '../../components/templates/Labels';

export const LabelsChartDailyVol = (props) => {
	const { base, quote } = props.units;

	// Assign values to title, axes labels
	const labelParams = {
		chartTitle: `${base}/${quote} Daily Volume in ${quote}`,
		xLabel: 'Date',
		yLabel: `Daily Volume (${quote})`
	};

	return (
		<>
			<Labels labelParams={labelParams} />
		</>
	)
};