// TEMPLATE COMPONENT
// purpose: define scales, axes, draw chart axes and labels
import React, {
    useState,
    useContext,
    useEffect,
    useRef,
    forwardRef,
} from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

// components
import { Line } from "./Line";
import { Labels } from "./Labels";

// context
import { DimensionContext } from "../context/DimensionContext";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    axes: {
        color: theme.palette.text.primary,
    },
}));

export const ChartLine = forwardRef((props, ref) => {
    const { data, chartParams, labelParams } = props;
    const { xParam, xParamType, xParamFormat, yParam, multiple } = chartParams;

    // styles
    const { chartDimensions } = useContext(DimensionContext);
    const { width, height } = chartDimensions.bounded;
    const {
        wrapperWidth,
        wrapperHeight,
        marginLeft,
        marginTop,
    } = chartDimensions.wrapper;
    const classes = useStyles();

    // ref, new state
    const xAxisRef = useRef(null);
    const yAxisRef = useRef(null);
    const [scales, setScales] = useState(null);

    useEffect(() => {
        if (data) {
            let dateParser;
            if (xParamType === "date") {
                if (xParamFormat === "timestamp") {
                    dateParser = ts => {
                        return new Date(ts * 1000);
                    };
                } else {
                    dateParser = d3.timeParse(xParamFormat);
                }
            }

            if (!multiple) {
                const xScale = d3
                    .scaleTime()
                    .domain(d3.extent(data, d => dateParser(d[xParam])))
                    .range([0, width]);

                const yScale = d3
                    .scaleLinear()
                    .domain([0, d3.max(data, d => d[yParam])])
                    .range([height, 0]);

                setScales({
                    xScale: xScale,
                    yScale: yScale,
                });

                // Axes
                const xAxisGenerator = d3.axisBottom().scale(xScale);
                const yAxisGenerator = d3.axisLeft().scale(yScale);

                d3.select(xAxisRef.current).call(xAxisGenerator);
                d3.select(yAxisRef.current).call(yAxisGenerator);
            } else {
                const values = Object.values(data)[0];
                const xScale = d3
                    .scaleTime()
                    .domain(d3.extent(values, d => dateParser(d[xParam])))
                    .range([0, width]);

                const yScale = d3
                    .scaleLinear()
                    .domain([0, d3.max(values, d => d[yParam])])
                    .range([height, 0]);

                setScales({
                    xScale: xScale,
                    yScale: yScale,
                });

                // Axes
                const xAxisGenerator = d3.axisBottom().scale(xScale);
                const yAxisGenerator = d3.axisLeft().scale(yScale);

                d3.select(xAxisRef.current).call(xAxisGenerator);
                d3.select(yAxisRef.current).call(yAxisGenerator);
            }
        }
    }, [data]);

    return (
        <>
            {data ? (
                <>
                    <svg
                        id="wrapper"
                        height={wrapperHeight}
                        width={wrapperWidth}
                        ref={ref}
                    >
                        <Labels labelParams={labelParams} />
                        <g
                            id="bounds"
                            height={height}
                            width={width}
                            transform={`translate(${marginLeft}, ${marginTop})`}
                        >
                            {scales ? (
                                <Line scales={scales} {...props} />
                            ) : (
                                <></>
                            )}
                            <g
                                ref={xAxisRef}
                                className={classes.axes}
                                transform={`translate(0,${height})`}
                            />
                            <g ref={yAxisRef} className={classes.axes} />
                        </g>
                    </svg>
                </>
            ) : (
                <h2>No chart data</h2>
            )}
        </>
    );
});

ChartLine.propTypes = {
    data: PropTypes.object,
    chartParams: PropTypes.object,
    labelParams: PropTypes.object,
};
