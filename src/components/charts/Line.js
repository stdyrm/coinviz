import React, { useState, useEffect, useContext } from "react";
import * as d3 from "d3";

// styles
import { DimensionContext } from '../context/DimensionContext';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../style/colors';

const useStyles = makeStyles((theme) => ({
	line: {
		fill: 'none',
		stroke: theme.palette.primary.main,
		strokeWidth: 1
	}
}));

export const Line = (props) => {
	const { data } = props;
	const { xParam, yParam, multiple } = props.chartParams;
	const { xScale, yScale } = props.scales;
	
	const [lineParams, setLineParams] = useState([]);
	const classes = useStyles();

	const {chartDimensions} = useContext(DimensionContext);
	const { marginLeft, marginTop } = chartDimensions.wrapper;

	useEffect(() => {
		const dateParser = (ts) => {
			return new Date(ts * 1000);
		};

		const lineGenerator = d3.line()
			.x(d => xScale(dateParser(d[xParam])))
			.y(d => yScale(d[yParam]));

		const linesObject = {};

		const renderLines = async () => {
			await data.forEach((d,i) => {
				linesObject[d[0].baseCurr] = {
					line: lineGenerator(d),
					lineLabel: d[0].baseCurr,
					lineColor: colors[i]
				};
			});
			await setLineParams(linesObject);
		};

		if (data) {
			renderLines();
			console.log(lineParams);
			console.log(data.length);
		}
  	}, [data]);

	return (
		<>
			{Object.keys(lineParams).length === data.length
				? Object.keys(lineParams).map((d,i) => {
						return (
							<g key={d}>
								<path
									fill="none"
									stroke={lineParams[d].lineColor}
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth={1.5}
									d={lineParams[d].line}
								/>
								<text 
									x={-(marginLeft)} 
									y={marginTop + 20 * i} 
									stroke={lineParams[d].lineColor}
								>
									{lineParams[d].lineLabel}
								</text>
							</g>
						)
					})				
				: <>
					<CircularProgress color="secondary" />
				</>
			}
		</>
  	);
};
