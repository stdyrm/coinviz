import React, { useState, useEffect } from "react";
import clsx from "clsx";

// components
import {
    AppTitle,
    Navbar,
	ParamDrawerSection,
} from "../sharedComponents/navigation";
import { TransactionCard } from "./inputs/TransactionCard";
import { TransactionTable } from "./interface/TransactionTable";
import { AggregatedCardList } from "./interface/AggregatedCardList";
import { ChartAggregated } from "./charts/ChartAggregated";

// functions
import { convertSummaryToReadable } from "./data/convertSummaryToReadable";
import { convertToReadable } from "./data/convertToReadable";

// params
import { navbarParams, appMenuParams } from "./appParams";

// styles
import {
    List,
    Grid,
    Toolbar,
    Collapse,
    Typography,
    IconButton,
	Divider,
	Paper,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialCard = {
    id: 0,
    date: String(new Date().toLocaleDateString()),
    baseQty: 0,
    baseUnits: null,
    quoteUnits: null,
};

const useStyles = makeStyles(theme => ({
    appWrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "auto",
        gridGap: theme.spacing(1),
        gridTemplateAreas:
            "'appTitle appTitle' 'gridItemChart gridItemChart' 'gridItemTotals gridItemBalances' 'gridItemTable gridItemTable'",
        [theme.breakpoints.up("md")]: {
            paddingLeft: 220,
            gridTemplateAreas:
                "'appTitle appTitle appTitle' 'gridItemChart gridItemChart gridItemTotals' 'gridItemChart gridItemChart gridItemBalances' 'gridItemTable gridItemTable gridItemTable'",
        },
    },
    appTitle: {
        gridArea: "appTitle",
    },
    gridItemChart: {
        gridArea: "gridItemChart",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
    },
    gridItemTotals: {
        gridArea: "gridItemTotals",
        backgroundColor: theme.palette.background.paper,
        minHeight: "100px",
        width: "minmax(100px, 1fr)",
		padding: theme.spacing(2),
		flexDirection: "column"
    },
    gridItemBalances: {
        gridArea: "gridItemBalances",
        backgroundColor: theme.palette.background.paper,
        minHeight: "100px",
        width: "minmax(100px, 1fr)",
		padding: theme.spacing(2),
		flexDirection: "column"
    },
    gridItemTable: {
        gridArea: "gridItemTable",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
    },
    paramDrawer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    expandOpen: {
        transform: "rotate(180deg)",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    totalsContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        margin: theme.spacing(1),
    },
    sectionTitle: {
        marginBottom: theme.spacing(2),
        fontSize: ".9rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.3rem",
        },
    },
    sectionTitleContainer: {
		alignItems: "baseline",
		paddingBottom: 0
    },
    faIcon: {
        fontSize: ".7rem",
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.1rem",
        },
	},
	totalsContents: {
		borderBottom: `1px solid ${theme.palette.primary.light}`,
		borderRight: `1px solid ${theme.palette.primary.light}`,
		width: "100%",
		marginBottom: theme.spacing(2),
		padding: theme.spacing(1)
	},
	balancesText: {
		fontSize: ".7rem",
		[theme.breakpoints.up("sm")]: {
			fontSize: "1rem"
		}
	},
}));

export const AppCoinQuote = () => {
    const [transactions, setTransactions] = useState([]);
    const [aggregated, setAggregated] = useState({});
    const [summary, setSummary] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const classes = useStyles();
    const theme = useTheme();

    const handleExpanded = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        let revSummary = {};
        Object.keys(aggregated).forEach(pair => {
            const agg = aggregated[pair];
            const units = agg.quoteUnits;

            if (!revSummary[units]) {
                revSummary[units] = {
                    units: units,
                    totalCost: agg.quoteQty,
                    totalCurrValue: agg.currQuoteQty,
                    totalProfitLoss: agg.profitLoss,
                    averageProfitLossPercent: agg.profitLossPercent,
                };
            } else {
                revSummary[units] = {
                    units: units,
                    totalCost: revSummary[units].totalCost + agg.quoteQty,
                    totalCurrValue:
                        revSummary[units].totalCurrValue + agg.currQuoteQty,
                    totalProfitLoss:
                        revSummary[units].totalProfitLoss + agg.profitLoss,
                    averageProfitLossPercent:
                        ((revSummary[units].totalCurrValue +
                            agg.currQuoteQty -
                            (revSummary[units].totalCost + agg.quoteQty)) /
                            (revSummary[units].totalCost + agg.quoteQty)) *
                        100,
                };
            }
        });
        setSummary({ ...revSummary });
    }, [aggregated]);

    useEffect(() => {
        console.log(summary);
    }, [summary]);

    return (
        <>
            <Navbar
                navbarParams={navbarParams}
                appMenuParams={appMenuParams}
                persistent={true}
            >
                <div className={classes.paramDrawer}>
                    <ParamDrawerSection title="Add Transaction">
                        <List>
                            <TransactionCard
                                initialCard={initialCard}
                                transactions={transactions}
                                setTransactions={setTransactions}
                            />
                        </List>
                    </ParamDrawerSection>
                </div>
            </Navbar>
            <Toolbar />
            <div />
            <Grid container className={classes.appWrapper}>
                <Grid container item className={classes.appTitle}>
                    <AppTitle
                        title="Coin Quote App"
                        variant="h5"
                        divider="none"
                    />
                </Grid>
				<Paper 
					component="Grid" 
					container item 
					className={classes.gridItemChart}
				>
                    <Grid container className={classes.sectionTitleContainer}>
                        <FontAwesomeIcon
                            icon="chart-bar"
                            className={classes.faIcon}
                        />
                        <AppTitle
                            title="Crypto Profit/Loss"
                            classes={{
                                typography: classes.sectionTitle,
                            }}
                        />
                    </Grid>
                    <Divider />
                    {transactions.length > 0 && (
                        <>
                            <ChartAggregated
                                aggregated={aggregated}
                                setAggregated={setAggregated}
                            />
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpanded}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                            <Collapse in={expanded} timeout="auto">
                                <AggregatedCardList
                                    transactions={transactions}
                                    title="Aggregated Info"
                                    aggregated={aggregated}
                                    setAggregated={setAggregated}
                                />
                            </Collapse>
                        </>
                    )}
                </Paper>
                <Paper component="Grid" container item className={classes.gridItemTotals}>
                    <Grid container className={classes.sectionTitleContainer}>
                        <FontAwesomeIcon
                            icon="calculator"
                            className={classes.faIcon}
                        />
                        <AppTitle
                            title="Total Profit/Loss"
                            classes={{
                                typography: classes.sectionTitle,
                            }}
                        />
                    </Grid>
					<Divider />
                    {summary &&
                        Object.keys(summary).map(units => {
                            const readable = convertSummaryToReadable(
                                summary[units]
                            );
                            return (
								<React.Fragment key={units}>
                                    <AppTitle
                                        title={units}
                                        divider="none"
                                    />
									<Paper square className={classes.totalsContents}>
										<Typography>
											Cost | {readable.totalCost}
										</Typography>
									</Paper>
									<Paper square className={classes.totalsContents}>
										<Typography>
											Pres. Value | {readable.totalCurrValue}
										</Typography>
									</Paper>
									<Paper square className={classes.totalsContents}>
										<Typography
											style={{
												color:
													summary[units].totalProfitLoss <
													0
														? theme.palette.secondary
															.main
														: theme.palette.primary
															.main,
											}}
										>
											{`Profit/loss | ${readable.totalProfitLoss} (${readable.averageProfitLossPercent})`}
										</Typography>
									</Paper>
								</React.Fragment>
                            );
                        })}
                </Paper>
                <Paper component="Grid" container item className={classes.gridItemBalances}>
                    <Grid container item className={classes.sectionTitleContainer}>
						<FontAwesomeIcon
                            icon="file-invoice"
                            className={classes.faIcon}
                        />
                        <AppTitle
                            title="Crypto Balances"
                            classes={{
                                typography: classes.sectionTitle,
                            }}
                        />
                    </Grid>
					<Divider />
                    {aggregated &&
                        Object.keys(aggregated).map(pair => {
                            const readable = convertToReadable(
                                aggregated[pair]
                            );
                            return (
								<Typography key={readable.pair} className={classes.balancesText}>
									{`${readable.baseQty} (${readable.quoteQty})`}
								</Typography>
                            );
                        })}
                </Paper>
                <Paper component="Grid" container item className={classes.gridItemTable}>
                    <Grid container item className={classes.sectionTitleContainer}>
                        <FontAwesomeIcon
                            icon="table"
                            className={classes.faIcon}
                        />
                        <AppTitle
                            title="Transaction Table"
                            variant="h6"
                            classes={{
                                typography: classes.sectionTitle,
                            }}
                        />
                    </Grid>
                    <TransactionTable
                        transactions={transactions}
                        setTransactions={setTransactions}
                    />
                </Paper>
            </Grid>
        </>
    );
};
