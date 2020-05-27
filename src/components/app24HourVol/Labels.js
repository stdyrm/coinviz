import React from "react";
import PropTypes from "prop-types";

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

export const Labels = props => {
    const { fiat, labelParams, wrapper, bounds } = props;

    const classes = useStyles();
    const { wrapperHeight, wrapperWidth, margin } = wrapper;
    const { height, width } = bounds;

    return (
        <>
            <text
                className={classes.chartTitle}
                textAnchor="middle"
                transform={`translate(${(margin.left + width) / 2}, ${
                    margin.top * 0.5
                })`}
            >
                {`${fiat} Past 24hr Volume`}
            </text>
            <text
                className={classes.chartAxis}
                textAnchor="end"
                transform={`translate(${margin.left + width}, ${
                    height + margin.top + 50
                })`}
            >
                Cryptocurrency
            </text>
            <text
                className={classes.chartAxis}
                textAnchor="end"
                transform={`translate(${margin.left}, ${margin.top - 10})`}
            >
                {`24hr Vol (${fiat})`}
            </text>
        </>
    );
};

Labels.propTypes = {
	fiat: PropTypes.string, 
	labelParams: PropTypes.object, 
	wrapper: PropTypes.object, 
	bounds: PropTypes.object
}