import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	focus: {
		stroke: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.light,
	},
	focusXValue: {
		fontSize: '.8rem',
		fill: theme.palette.text.primary,
	},
	focusYValue: {
		fontSize: '.7rem',
		fill: theme.palette.text.primary,
	},
}))

export const Overlay = (props) => {
	const { height, width, margin, data, transform, scales } = props;
	const { xScale } = scales;

	const focusRef = useRef(null);
	const overlayRef = useRef(null);
	const classes = useStyles();

	let xValues = [];
	const barCenter = xScale.bandwidth() / 2;

	data.forEach((d,i) => {
		xValues.push(xScale(d.cryptocurrency) + barCenter);
	});

	const bisectBands = (xScaleVals, mouseX) => {
		// FOR BAND SCALES
		// return mouse x-position as index of xScale for bisector function 
		const closestVal = xScaleVals.reduce((a,b) => {
			return (Math.abs(a - mouseX) < Math.abs(b - mouseX) ? a : b);
		});
		const closestValIndex = xScaleVals.findIndex(i => i === closestVal);
		return [closestVal, closestValIndex];
	};

	useEffect(() => {
		function mousemove() {
		let x0 = d3.mouse(this)[0];
		const [closestVal, closestValIndex] = bisectBands(xValues, x0);

		d3.select(focusRef.current)
			.select("#x-focus-line")
			.attr('transform', `translate(${closestVal}, 0)`);
			
		d3.select(focusRef.current)
			.select("#x-focus-x-val")
			.attr('transform', `translate(${closestVal + xScale.bandwidth() * .6}, 0)`)
			.text(`${data[closestValIndex].cryptocurrency}`);

		d3.select(focusRef.current)
			.select("#x-focus-y-val")
			.attr('transform', `translate(${closestVal + xScale.bandwidth() * .6}, 0)`)
			.text(`${data[closestValIndex].vol24HourTo ? Math.round(data[closestValIndex].vol24HourTo).toLocaleString() : "No data"}`);
	};
		d3.select(overlayRef.current).on('mousemove', mousemove);
	},[]);

	return (
		<>
			<g ref={focusRef} className="focus" transform={`translate(${margin.left}, ${margin.top})`}>
				<line
					id="x-focus-line"
					className={classes.focus}
					y1={0}
					y2={height}
					strokeWidth={1} 
				/>
				<text
					id="x-focus-x-val" 
					className={classes.focusXValue}
					y={15}
				/>
				<text
					id="x-focus-y-val" 
					className={classes.focusYValue}
					y={30}
				/>
			</g>
			<rect
				ref={overlayRef} 
				height={height}
				width={width}
				style={{opacity: 0}}
				transform={transform}
				onMouseOver={() => d3.select(focusRef.current).style('display', null)}
				onMouseOut={() => d3.select(focusRef.current).style('display', 'none')}
			/>
		</>
	)
};