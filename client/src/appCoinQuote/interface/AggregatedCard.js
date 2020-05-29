import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// functions
import { convertToReadable } from "../data/convertToReadable";

// styles
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    Divider,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    card: {
        border: `1px solid ${theme.palette.background.paper}`,
        margin: theme.spacing(1),
        width: 220,
        transition: "opacity 0.3s",
        "&:hover": {
            opacity: 0.8,
        },
    },
    cardHeader: {
        paddingBottom: 0,
    },
    cardTitle: {
        ...theme.typography.title,
        fontSize: "1.2rem",
    },
    cardContent: {
        padding: theme.spacing(2),
    },
    cardContentSection: {
        color: theme.palette.text.primary,
        fontWeight: 600,
    },
    cardContentText: {
        color: theme.palette.text.primary,
        fontWeight: 400,
    },
    divider: {
        backgroundColor: theme.palette.text.primary,
    },
}));

export const AggregatedCard = props => {
    const { title, aggregatedPair } = props;
    const [readable, setReadable] = useState(null);

    const theme = useTheme();
    const classes = useStyles();

    useEffect(() => {
        setReadable(convertToReadable(aggregatedPair));
    }, [aggregatedPair]);

    return (
        <>
            {readable && (
                <Card className={classes.card} square>
                    <CardHeader
                        title={title}
                        subheader={[
                            readable.baseQty,
                            <br key={title} />,
                            readable.currQuoteQty,
                            " ",
                            `(${readable.currQuotePerUnit}/${readable.baseUnits})`,
                        ]}
                        className={classes.cardHeader}
                        classes={{
                            title: classes.cardTitle,
                        }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardContentSection}>
                            Cost Basis
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography
                            variant="subtitle2"
                            className={classes.cardContentText}
                        >
                            Total: {readable.quoteQty}
                            <br />
                            Average: {readable.weightedAverageCost}
                        </Typography>
                        <br />
                        <Typography className={classes.cardContentSection}>
                            Profit/loss
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography
                            variant="subtitle2"
                            className={classes.cardContentText}
                            style={{
                                color:
                                    aggregatedPair.profitLoss < 0
                                        ? theme.palette.secondary.main
                                        : theme.palette.primary.main,
                            }}
                        >
                            {readable.profitLoss} ({readable.profitLossPercent})
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

AggregatedCard.propTypes = {
    title: PropTypes.string.isRequired,
    aggregatedPair: PropTypes.object.isRequired,
};
