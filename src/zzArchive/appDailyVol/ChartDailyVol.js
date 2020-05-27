import React, { useContext } from 'react'

// components
import { ChartLine } from '../../components/templates/ChartLine';
import { LabelsChartDailyVol } from './LabelsChartDailyVol';

// context
import { DimensionContext } from './AppDailyVol';

export const ChartDailyVol = (props) => {
	const dimensions = useContext(DimensionContext);
	const { units } = props;

	// Define x and y scale data types/formats
	const scaleParams = {
		xScaleType: "date",
		xScaleFormat: "timestamp",
		yScaleType: "linear",
		yScaleFormat: "float"
	};

	return (
		<>
			<ChartLine scaleParams={scaleParams} {...props}>
				<LabelsChartDailyVol units={units} />
			</ChartLine>
		</>
	)
};

