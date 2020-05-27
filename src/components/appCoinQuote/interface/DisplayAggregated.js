import React, { useEffect } from 'react';
import PropTypes from "prop-types";

// components
import { AppTitle } from "../../navigation/AppTitle";
import { AggregatedCard } from "./AggregatedCard";

// functions
import { aggregateTransactions } from "../data/aggregateTransactions";
// styles
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	sectionTitle: {
		margin: theme.spacing(2),
	},
	aggGridContainer: {
		display: "flex",
		justifyContent: "center",
		[theme.breakpoints.up("md")]: {
			justifyContent: "flex-start",
		}
	},
}));

export const DisplayAggregated = (props) => {
	const { aggregated, setAggregated, transactions } = props;

	const classes = useStyles();

	useEffect(() => {
		setAggregated(aggregateTransactions(transactions));
	}, [transactions]);

	return (
		<>
			<AppTitle 
				title="Aggregated" 
				variant="h6" 
				divider="none" 
				classes={{
					typography: classes.sectionTitle,
				}}
			/>
			<Grid container className={classes.aggGridContainer}>
			{Object.keys(aggregated).map(pair => (
					<AggregatedCard 
						title={pair} 
						aggregatedPair={aggregated[pair]} 
					/>
				)
			)}
			</Grid>
		</>
	);
};

DisplayAggregated.propTypes = {
	aggregated: PropTypes.object, 
	setAggregated: PropTypes.func, 
	transactions: PropTypes.arrayOf(PropTypes.object)
};