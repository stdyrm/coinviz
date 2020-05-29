import React, { useContext } from "react";
import PropTypes from "prop-types";

// context
import { DimensionsContext } from "../context/DimensionsContext";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    chartTitle: {
        ...theme.typography.chartTitle,
        fontWeight: 700,
        fill: theme.palette.text.primary,
    },
    chartAxis: {
        fontSize: ".7rem",
        fontWeight: 700,
        fill: theme.palette.text.primary,
    },
}));

export const Labels24Hr = props => {
	const { fiat, labelParams } = props;
	const { chartTitle, yLabel, xLabel } = labelParams;
	const { dim } = useContext(DimensionsContext);
	const { height, width, margin } = dim;

    const classes = useStyles();

    return (
        <>
            <text
                className={classes.chartTitle}
			textAnchor="start"
                transform={`translate(${(margin.left + width) / 2}, ${
                    margin.top * 0.5
                })`}
            >
                {`${fiat} ${chartTitle}`}
            </text>
            <text
                className={classes.chartAxis}
                textAnchor="end"
                transform={`translate(${margin.left + width}, ${
                    height + margin.top + 50
                })`}
            >
                {xLabel}
            </text>
            <text
                className={classes.chartAxis}
                textAnchor="end"
                transform={`translate(${margin.left}, ${margin.top - 10})`}
            >
                {`${yLabel} (${fiat})`}
            </text>
        </>
    );
};

Labels24Hr.propTypes = {
	fiat: PropTypes.string, 
	labelParams: PropTypes.shape({
		chartTitle: PropTypes.string.isRequired,
		yLabel: PropTypes.string.isRequired,
		xLabel: PropTypes.string.isRequired
	}), 
};