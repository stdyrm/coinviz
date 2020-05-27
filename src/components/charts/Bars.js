import React from 'react';
import PropTypes from 'prop-types';

// styles
import { useTheme } from "@material-ui/core/styles";

export const Bars = (props) => {
	const { data, chartParams, scales, bounds } = props;
	const { xScale, yScale } = scales;

	const { height, width } = bounds;
	const theme = useTheme();

	return (
		<>
			{scales
				? <>
					{data.map((d,i) => {
						return (
							<rect
								key={d.cryptocurrency}
								y={yScale(d.vol24HourTo)}
								x={xScale(d.cryptocurrency)}
								width={xScale.bandwidth()}
								height={height - yScale(d.vol24HourTo)}
								style={{fill: theme.palette.secondary.main}}
							/>
						)
					})}
				</>
				: <></>
			}
		</>
	)
};

Bars.propTypes = {
	data: PropTypes.array,
	chartParams: PropTypes.object,
	scales: PropTypes.object,
	bounds: PropTypes.object.isRequired
};