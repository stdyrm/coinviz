import React, { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";
import PropTypes from "prop-types";

// components
import { AppTitle } from "../../sharedComponents/navigation/AppTitle";
import { BarsAggregated } from "./BarsAggregated";
import { LabelsAggregated } from "./LabelsAggregated";

// styles
import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';

// params
import { chartParamsAggBar, labelParamsAggBar } from "../appParams";

const wrapper = {
	wrapperWidth: window.innerWidth * .9,
	wrapperHeight: window.innerHeight * .8,
	margin: {
		top: 10,
		right: 20,
		bottom: 80,
		left: 80,
	},
};
  
const bounds = {
	width: wrapper.wrapperWidth - wrapper.margin.left - wrapper.margin.right,
	height: wrapper.wrapperHeight - wrapper.margin.top - wrapper.margin.bottom,
};

const useStyles = makeStyles((theme) => ({
	componentWrapper: {
		height: wrapper.wrapperHeight,
		width: "100%",
	},
	sectionTitle: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
	chartWrapper: {
		width: "100%",
		height: "85%",
		position: "relative",
	},
	chartBounds: {
		position: "relative",
		width: "100%",
		height: "100%",
	},
	xTick: {
		fontSize: "1rem",
		fontWeight: 600,
	},
}));

const convertObjToArray = (obj) => {
	let cleanedData = [];
	Object.keys(obj).forEach(key => {
		cleanedData.push(obj[key]);
	});

	return cleanedData;
};

export const ChartAggregated = (props) => {
	const { aggregated } = props;
	const { xParam, yParam } = chartParamsAggBar;

	const classes = useStyles();
	const theme = useTheme();
	const mqdSmall = useMediaQuery(theme.breakpoints.down("sm"));

	const [scales, setScales] = useState(null);
	const [data, setData] = useState(null);

	const svgRef = useRef(null);
	const yAxisRef = useRef(null);
	const xAxisRef = useRef(null);

	const { wrapperWidth, wrapperHeight, margin } = wrapper;
	const { width, height } = bounds;

	useEffect(() => {
		setData(convertObjToArray(aggregated));
	}, [aggregated]);

	useEffect(() => {
		if (data) {

			// responsive width
			const resWidth = mqdSmall ? width : width * .5;
			const resPadding = mqdSmall ? .1 : .4;

			// scales
			const xScale = d3.scaleBand()
				.domain(data.map(d => d[xParam.selected]))

			if (data.length < 3) {
				xScale
					.range([0, resWidth * .5])
					.padding(resPadding);
			} else if (data.length < 5) {
				xScale
					.range([0, resWidth * .8])
					.padding(resPadding);
			} else {
				xScale
					.range([0, width])
					.padding(resPadding);
			}

			const yScale = d3.scaleLinear()
				.domain([-100, 100])
				.range([height, 0]);

			setScales({
				xScale,
				yScale
			});

			// axes
			const xAxisGenerator = d3.axisBottom().scale(xScale);
			const yAxisGenerator = d3.axisLeft().scale(yScale);

			const xAxis = d3.select(xAxisRef.current)

			if (mqdSmall) {
				xAxis
					.call(xAxisGenerator)
					.selectAll("text")
						.attr("dy", "-.35em")
						.attr("transform", "rotate(-90)")
						.style("fontSize", ".7rem")
						.style("text-anchor", "end")
						.attr("x", -height / 2)
			} else {
				xAxis
					.call(xAxisGenerator)
					.selectAll("text")
						.attr("class", classes.xTick)
						.style("text-anchor", "middle")
						.attr("y", height / 2)
			}

			d3.select(yAxisRef.current).call(yAxisGenerator);
		}
	}, [data]);

	return (
		<Grid container className={classes.componentWrapper}>
			<AppTitle 
				title="Base-quote profit/loss"
				divider="none"
				variant="h6"
				classes={{
					typography: classes.sectionTitle
				}}
			/>
			<svg 
				ref={svgRef} 
				id="wrapper" 
				className={classes.chartWrapper}
				viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
			>
				{data && data.length > 0
					&& <LabelsAggregated wrapper={wrapper} bounds={bounds} labelParams={labelParamsAggBar} />
				}
				<g 
					id="bounds"
					transform={`translate(${margin.left}, ${margin.top})`}
					className={classes.chartBounds}
				>
					<g 
						ref={xAxisRef} 
						className={classes.axes} 
						transform={`translate(0,${height / 2})`}
					/>
					<g ref={yAxisRef} />
					{data && scales 
						&& <BarsAggregated
								yParam={yParam} 
								scales={scales}
								height={height}
								data={data}
							/>
					}
				</g>
			</svg>
		</Grid>
	)
};

ChartAggregated.propTypes = {
	aggregated: PropTypes.object.isRequired
};