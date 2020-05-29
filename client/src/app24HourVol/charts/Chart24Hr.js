// parent: Data.js
// purpose: define scales, axes, draw chart axes and labels
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

// components
import { Bars24Hr } from "./Bars24Hr";
import { Labels24Hr } from './Labels24Hr';
import { Overlay } from './Overlay';

// context
import { DimensionsContext } from "../context/DimensionsContext";

// params
import { chartParams, labelParams } from "../appParams";

// styles
import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const wrapper = {
	wrapperWidth: window.innerWidth * .9,
	wrapperHeight: window.innerHeight * .7,
	margin: {
	  top: 50,
	  bottom: 60,
	  right: window.innerWidth * .05,
	  left: window.innerWidth * .1,
	},
};
  
const bounds = {
	width: wrapper.wrapperWidth - wrapper.margin.left - wrapper.margin.right,
	height: wrapper.wrapperHeight - wrapper.margin.top - wrapper.margin.bottom,
};

export const Chart24Hr = (props) => {
	const { data, fiat } = props;
	const [dim, setDim] = useState({...wrapper, ...bounds});
	const { wrapperHeight, wrapperWidth, margin, height, width } = dim;

	const theme = useTheme();

	const useStyles = makeStyles((theme) => ({
		chartWrapper: {
			width: "100%",
			height: "100%",
			position: "relative",
		},
		chartBounds: {
			position: "absolute",
		},
		axes: {
			color: theme.palette.text.primary,
		},
	}));
	
	// new state
	const xAxisRef = useRef(null);
	const yAxisRef = useRef(null);
	const [scales, setScales] = useState(null);

	// styles
	const classes = useStyles();

	const renderOverlay = (
		<Overlay 
			scales={scales} 
			data={data}
			fiat={fiat}
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
		});

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
		<DimensionsContext.Provider value={{dim, setDim}} > 
			<svg 
				id="wrapper"
				className={classes.chartWrapper}
				// height={height}
				// width={width}
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
								/>
							}
						</g>
					: <></>
				}
				{scales && renderOverlay}
			</svg>
		</DimensionsContext.Provider>
	)
};

Chart24Hr.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object), 
	fiat: PropTypes.string, 
	cryptoList: PropTypes.array,
};