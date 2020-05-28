// parent: Data.js
// purpose: define scales, axes, draw chart axes and labels
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

// components
import { Bars24Hr } from "./Bars24Hr";
import { Labels24Hr } from './Labels24Hr';
import { Overlay } from '../../sharedComponents/charts';

// params
import { chartParams, labelParams } from "../appParams";

// styles
import { makeStyles } from '@material-ui/core/styles';

const wrapper = {
	wrapperWidth: window.innerWidth * .9,
	wrapperHeight: window.innerHeight * .9,
	margin: {
	  top: 50,
	  right: 80,
	  bottom: 60,
	  left: 110,
	},
};
  
  const bounds = {
	width: wrapper.wrapperWidth - wrapper.margin.left - wrapper.margin.right,
	height: wrapper.wrapperHeight - wrapper.margin.top - wrapper.margin.bottom,
};

const useStyles = makeStyles((theme) => ({
	chartWrapper: {
		width: "100%",
		height: "100%",
		position: "relative",
	},
	chartBounds: {
		position: "relative",
		width: "100%",
		height: "100%",
		backgroundColor: "red",
	},
	chartBar: {
		height: "100%",
		width: "100%",
		position: "relative",
	},
	axes: {
		color: theme.palette.text.primary,
	},
}));

export const Chart24Hr = (props) => {
	const { data, fiat } = props;
	
	// new state
	const xAxisRef = useRef(null);
	const yAxisRef = useRef(null);
	const [scales, setScales] = useState(null);

	// styles
	const classes = useStyles();
	const { wrapperHeight, wrapperWidth, margin } = wrapper;
	const { height, width } = bounds;

	const renderOverlay = (
		<Overlay 
			scales={scales} 
			height={height}
			width={width}
			margin={margin}
			data={data}
			fiat={fiat}
			// {...props}
			transform={`translate(${margin.left}, ${margin.top})`}
		/>
	);

	useEffect(() => {
		// Scales
		const xScale = d3.scaleBand()
			.domain(data.map(d => d.cryptocurrency))
			.range([0, width])
			.padding(0.2);

		const yScale = d3.scaleLinear()
			.domain([0, d3.max(data, d => d.vol24HourTo)])
			.range([height, 0]);

		setScales({
			xScale: xScale,
			yScale: yScale
		})

		// Axes
		const xAxisGenerator = d3.axisBottom().scale(xScale);
		const yAxisGenerator = d3.axisLeft().scale(yScale);

		d3.select(xAxisRef.current)
			.call(xAxisGenerator)
			.selectAll("text")
				.style("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", ".15em")
				.attr("transform", "rotate(-65)");
		d3.select(yAxisRef.current).call(yAxisGenerator);

	}, [data, width, height]);

	return (
		<>
			<svg 
				id="wrapper" 
				className={classes.chartWrapper}
				viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
			>
				<Labels24Hr 
					fiat={fiat} 
					labelParams={labelParams} 
					wrapper={wrapper} 
					bounds={bounds} 
				/>
				{data
					? <g 
						id="bounds" 
						transform={`translate(${margin.left}, ${margin.top})`}
						className={classes.chartBounds}
					>
							<g 
								ref={xAxisRef}
								className={classes.axes} 
								transform={`translate(0,${height})`}
							/>
							<g ref={yAxisRef} className={classes.axes} />
							{scales &&
								<Bars24Hr 
									data={data}
									scales={scales}
									chartParams={chartParams}
									bounds={bounds}
									className={classes.chartBar}
								/>
							}
						</g>
					: <></>
				}
				{scales && renderOverlay}
			</svg>
		</>
	)
};

Chart24Hr.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object), 
	fiat: PropTypes.string, 
	cryptoList: PropTypes.array,
};