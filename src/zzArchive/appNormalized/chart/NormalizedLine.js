import React, { useState, useEffect, useContext } from "react";
import * as d3 from "d3";

// base components
import { Line } from '../../templates/Line';

// styles
import { DimensionContext } from '../../context/DimensionContext';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../style/colors';

const useStyles = makeStyles((theme) => ({
	line: {
		fill: 'none',
		stroke: theme.palette.primary.main,
		strokeWidth: 1
	}
}));

export const NormalizedLine = (props) => {
	const { data } = props;
	const { xParam, yParam } = props.chartParams;
	const { xScale, yScale } = props.scales;
	
	const [lineParams, setLineParams] = useState([]);
	const classes = useStyles();

	const {chartDimensions} = useContext(DimensionContext);

	useEffect(() => {
		if (data) {
			const dateParser = (ts) => {
				return new Date(ts * 1000);
			};

			let linesObject = {};

			Object.keys(data).forEach((c,i) => {
				const dataEach = data[c];

				const lineGenerator = d3.line()
					.x(d => xScale(dateParser(d[xParam])))
					.y(d => yScale(d[yParam]))

				linesObject[c] = {
					line: lineGenerator(dataEach),
					lineLabel: c,
					lineLabelX: 100,
					lineLabelY: 500,
					lineColor: colors[i]
				};
			});
			setLineParams(linesObject);
		}
  	}, [cryptoParams]);

	return (
		<>
			<Line {...props} />
		</>
  	);
};
