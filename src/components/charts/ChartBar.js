// TEMPLATE: Chart
// purpose: define scales, axes, draw chart axes and labels
import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3';

// components
import { Bars } from './Bars';
import { Labels } from './Labels';

// styles
import { theme } from '../../style/theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	axes: {
		color: theme.palette.text.primary
	}
}))

export const ChartBar = (props) => {
	const { data, chartParams, labelParams, fiat } = props;
	const {xParam, yParam} = chartParams;
	
	// new state
	const [scales, setScales] = useState(null);

	// ref
	const xAxisRef = useRef(null);
	const yAxisRef = useRef(null);

	// styles
	const classes = useStyles();
	const wrapperWidth = window.innerWidth * .8;
	const wrapperHeight = window.innerHeight * .8;
	const margin = {
		top: 60,
		right: 60,
		bottom: 100,
		left: 140,
	};
	const width = wrapperWidth - margin.left - margin.right;
	const height = wrapperHeight - margin.top - margin.bottom;
	
	useEffect(() => {
			// Scales
			const xScale = d3.scaleBand()
				.domain(data.map(d => d[xParam]))
				.range([0, width])
				.padding(0.2);

			const yScale = d3.scaleLinear()
				.domain([0, d3.max(data, d => d[yParam])])
				.range([height, 0]);

			setScales({
				xScale: xScale,
				yScale: yScale
			});

			// Axes
			const xAxisGenerator = d3.axisBottom().scale(scales.xScale);
			const yAxisGenerator = d3.axisLeft().scale(scales.yScale);

			d3.select(xAxisRef.current).call(xAxisGenerator);
			d3.select(yAxisRef.current).call(yAxisGenerator);
		}
	}, [data])

	return (
		<>
			{data
				? <>
					<svg id="wrapper" height={wrapperHeight} width={wrapperWidth} style={{fill: theme.palette.grey[800]}}>
						<Labels fiat={fiat} labelParams={labelParams} />
						<g 
							id="bounds" 
							height={height} 
							width={width} 
							transform={`translate(${margin.left}, ${margin.top})`} 
							style={{fill: theme.palette.grey[800]}}
						>
							<Bars
								data={data}
								chartParams={chartParams}
								scales={scales} 
							/>
							<g 
								ref={xAxisRef}
								className={classes.axes} 
								transform={`translate(0,${height})`}
							/>
							<g ref={yAxisRef} className={classes.axes} />
						</g>
					</svg>
				</>
				: <h2>No chart data</h2>
			}
		</>
	)
};