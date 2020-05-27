import React from 'react'

// styles
import { makeStyles } from '@material-ui/core/styles';
import { wrapper, bounded } from '../../style/dimensions';
import { theme } from '../../style/theme';

const useStyles = makeStyles((theme) => ({
	chartTitle: {
		...theme.typography.chartTitle,
		fill: theme.palette.text.primary
	},
	chartAxis: {
		fill: theme.palette.text.primary
	},
}));

export const Labels = (props) => {
	const { labelParams } = props;
	const {chartTitle, xLabel, yLabel} = labelParams;
	const classes = useStyles();
	const { wrapperWidth, wrapperHeight, margin } = wrapper;
	const { height, width } = bounded;

	return (
		<>
			<text
				className={classes.chartTitle}
				textAnchor="middle"
				transform={`translate(${margin.left + width / 2}, ${margin.top / 2})`}
			>
				{chartTitle}
			</text>
			<text
				className={classes.chartAxis}
				textAnchor="middle"
				transform={`translate(${margin.left + width / 2}, ${margin.top + height + 50})`}
			>
				{xLabel}
			</text>
			<text
				className={classes.chartAxis}
				textAnchor="middle"
				transform={`translate(${margin.left - 50}, ${height / 2}) rotate(-90)`}
			>
				{yLabel}
			</text>
		</>
	)
};