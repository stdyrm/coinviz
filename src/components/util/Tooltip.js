import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

// styles
import { makeStyles } from '@material-ui/core/styles';
import { bounded } from '../../style/dimensions';

const useStyles = makeStyles((theme) => ({
	tooltipBox: {
		// ...theme.tooltip.box
	},
	tooltipInfo: {
		...theme.typography.tooltip
	},
}))

const Tooltip = ({ x, y, tooltipInfo, fiat }) => {
	const classes = useStyles();
	const { width, height } = bounded;

	const volModified = tooltipInfo.vol24HourTo.toLocaleString()

	return (
		<>
			<text
				x={width * .8}
				y={height * .05}
				className={classes.tooltipInfo}
			>
				{tooltipInfo.cryptocurrency}
			</text>
			<text
				x={width * .8}
				y={height * .05 + 15}
				className={classes.tooltipInfo}
			>
				{volModified}{fiat}
			</text>
		</>
	);

};

export { Tooltip };