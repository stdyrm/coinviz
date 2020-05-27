import React, { useState, useEffect } from 'react'
import { bisector, mouse } from 'd3';

export const MouseMove = (props) => {
	const { xScale, yScale } = props.scales;
	const { fiatChartData, fiat } = props;
	
	useEffect(() => {
		console.log(props);

		const bisectCrypto = bisector(d => d.cryptocurrency).left;

		function mousemove() {
			const x0 = xScale.invert(mouse(this)[0]),
				i = bisectCrypto(fiatChartData, x0, 1),
				d0 = fiatChartData[i - 1],
				d1 = fiatChartData[i - 1],
				d = x0 - d0.cryptocurrency > d1.cryptocurrency - x0 ? d1 : d0;
		}
	}, [])

	return null;
};
