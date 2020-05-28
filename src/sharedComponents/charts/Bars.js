import React from 'react';
import clsx from "clsx";
import PropTypes from 'prop-types';

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	rect: {
		fill: theme.palette.secondary.main,
	}
}))

export const Bars = (props) => {
	const { data, chartParams, scales, bounds, classes, innerPropsRect } = props;
	const { xScale, yScale } = scales;
	const { xParam, yParam } = chartParams;
	const { height } = bounds;

	const defaultClasses = useStyles();

	return (
		<>
			{scales
				? <>
					{data.map(d => {
						return (
							<rect
								key={d[xParam]}
								y={yScale(d[yParam])}
								x={xScale(d[xParam])}
								width={xScale.bandwidth()}
								height={isNaN(d[yParam]) ? 0 : height - yScale(d[yParam])}
								className={clsx(defaultClasses.rect, classes.rect)}
								{...innerPropsRect}
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
	chartParams: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	scales: PropTypes.object,
	bounds: PropTypes.object.isRequired
};

Bars.defaultProps = {
	classes: {},
	innerPropsRect: {},
};