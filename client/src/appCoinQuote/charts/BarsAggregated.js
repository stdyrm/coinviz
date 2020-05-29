import React, { useState } from "react";
import PropTypes from "prop-types";

// components
import { AggregatedCard } from "../interface/AggregatedCard";

// functions
import { convertToReadable } from "../data/convertToReadable";

// styles
import { Dialog } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

export const BarsAggregated = props => {
    const { data, scales, height, yParam } = props;
	const { xScale, yScale } = scales;

	const [selectedBar, setSelectedBar] = useState(null);

	const handleDialog = (e) => {
		!selectedBar ? setSelectedBar(e.currentTarget.id) : setSelectedBar(null);
	};

    const useStyles = makeStyles(theme => ({
        bar: {
			"&:hover": {
				cursor: "pointer",
				opacity: 0.8,
				stroke: theme.palette.text.primary,
			},
        },
    }));

    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            {data.map(d => {
				const readable = convertToReadable(d);

				return (
					<React.Fragment key={d.pair}>
						<rect
							id={d.pair}
							y={
								d[yParam.selected] > 0
									? yScale(d[yParam.selected])
									: height / 2
							}
							x={xScale(d.pair)}
							width={xScale.bandwidth()}
							height={
								d[yParam.selected] > 0
									? height / 2 - yScale(d[yParam.selected])
									: yScale(d[yParam.selected]) - height / 2
							}
							className={classes.bar}
							style={{
								fill:
									d[yParam.selected] > 0
										? theme.palette.primary.main
										: theme.palette.secondary.main,
							}}
							onClick={handleDialog}
						>
							<title>
								{[readable.pair,"\n",readable.profitLoss," ",`(${readable.profitLossPercent})`]}
							</title>
						</rect>
						<Dialog
							id={d.pair}
							open={selectedBar ? Boolean(selectedBar === d.pair) : false}
							onClose={handleDialog}
						>
							<AggregatedCard title={d.pair} aggregatedPair={d}/>
						</Dialog>
					</React.Fragment>
				)}
			)}
        </>
    );
};

BarsAggregated.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired, 
	scales: PropTypes.object.isRequired, 
	height: PropTypes.number.isRequired, 
	yParam: PropTypes.object.isRequired
};