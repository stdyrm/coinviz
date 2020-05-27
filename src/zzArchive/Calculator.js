import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// functions 
import { getApiData } from "../components/appCoinQuote/data/getApiData";

// styles
import { Divider, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
	cardProfitLoss: {
		gridColumn: "1 / 3",
		gridRow: "4",
		display: "flex",
		flexDirection: "column",
	},
	text: {	
		fontWeight: 400,
		fontSize: ".8rem",
		color: theme.palette.text.primary,
	},
	divider: {
		backgroundColor: theme.palette.text.primary,
		marginBottom: theme.spacing(2),
	}
}));

export const Calculator = props => {
    const { currentCard, setCurrentCard } = props;

    const theme = useTheme();
	const classes = useStyles();
	
	const calculateCardData = () => {
		// derive calculated values based on user input + API response.
		getApiData(currentCard)
			.then(res => {
				const conversionRate = res[0].data[currentCard.baseUnits][currentCard.quoteUnits];
				const quoteQty = res[0].data[currentCard.baseUnits][currentCard.quoteUnits] * parseFloat(currentCard.baseQty);
				const currConversionRate = res[1].data[currentCard.baseUnits][currentCard.quoteUnits];
				const currQuoteQty = res[1].data[currentCard.baseUnits][currentCard.quoteUnits] * parseFloat(currentCard.baseQty);
				setCurrentCard({
					...currentCard,
					conversionRate,
					quoteQty,
					currConversionRate,
					currQuoteQty,
					profitLoss: currQuoteQty - quoteQty,
					profitLossPercent: ((currQuoteQty - quoteQty) / quoteQty * 100)
				})
			}
		);
	};

    return (
        <div className={classes.cardProfitLoss}>
			<Typography className={classes.text}>
				Cost basis =>
				{Intl.NumberFormat(currentCard.quoteUnits, {
					style: "currency",
					currency: currentCard.quoteUnits,
				}).format(currentCard.quoteQty)} >>>
				({Intl.NumberFormat(currentCard.quoteUnits, {
					style: "currency",
					currency: currentCard.quoteUnits,
				}).format(currentCard.quoteQty / currentCard.baseQty) +
					"/unit"})
			</Typography>
			<Divider className={classes.divider}/>	
				<Typography className={classes.text}>
					Present value => 
					{Intl.NumberFormat(currentCard.quoteUnits, {
					style: "currency",
					currency: currentCard.quoteUnits,
				}).format(currentCard.currQuoteQty)} >>>
				({Intl.NumberFormat(currentCard.quoteUnits, {
					style: "currency",
					currency: currentCard.quoteUnits,
				}).format(currentCard.currQuoteQty / currentCard.baseQty) +
					"/unit"})
			</Typography>  
			<Divider className={classes.divider} />
			<Typography className={classes.text}>
				Profit/loss => 
				{Intl.NumberFormat(currentCard.quoteUnits, {
					style: "currency",
					currency: currentCard.quoteUnits,
				}).format(currentCard.currQuoteQty - currentCard.quoteQty)} >>>
				({(
					(currentCard.currQuoteQty - currentCard.quoteQty) /
					currentCard.quoteQty
				).toFixed(2) *
					100 +
					"%"})
			</Typography>
			<Divider className={classes.divider}/>
        </div>
    );
};
