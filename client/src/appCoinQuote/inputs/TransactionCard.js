import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

// components
import { InputActionButtons } from "./InputActionButtons";
import { InputDate } from "./InputDate";
import { InputUnits } from "./InputUnits";
import { AlertDialog } from "../../sharedComponents/util";

// functions 
import { getApiData } from "../data/getApiData";

// style
import {
	TextField,
	Divider,
	Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// reference
import { currencies } from "../../sharedResources/reference/currencies";

const useStyles = makeStyles(theme => ({
    card: {
		opacity: 0.9,
		display: "flex",
		flexDirection: "column",
        gridGap: theme.spacing(1),
		padding: theme.spacing(1),
		margin: 4,
		transition: "all 0.3s",
		"&:hover": {
			opacity: 1,
		},
	},
    cardRow1: {
        gridColumn: "1 / 3",
		gridRow: "1",
    },
    cardRow2: {
        gridColumn: "1 / 3",
        gridRow: "2",
    },
    cardRow3Col1: {
        gridColumn: "1 / 3",
        gridRow: "3",
    },
    cardRow3Col2: {
        gridColumn: "1 / 3",
        gridRow: "4",
	},
	cardRow4: {
		gridColumn: "1 / 3",
		gridRow: "5",
	},
    cardRow5: {
        gridColumn: "1 / 3",
        gridRow: "6",
	},
}));

export const TransactionCard = props => {
	const { setTransactions, initialCard } = props;
	const [currentCard, setCurrentCard] = useState(initialCard);
	const [openDialog, setOpenDialog] = useState({
		open: false,
		message: ""
	});

	const classes = useStyles(props);

	const calculateCardData = (card) => {
		getApiData(card)
			.then(res => {
				const id = uuidv4();
				const costPerUnit = res[0].data[card.baseUnits][card.quoteUnits];
				const quoteQty = res[0].data[card.baseUnits][card.quoteUnits] * parseFloat(card.baseQty);
				const currCostPerUnit = res[1].data[card.baseUnits][card.quoteUnits];
				const currQuoteQty = res[1].data[card.baseUnits][card.quoteUnits] * parseFloat(card.baseQty);
				const profitLoss = currQuoteQty - quoteQty;
				const profitLossPercent = ((currQuoteQty - quoteQty) / quoteQty * 100);

				const newTransaction = {
					...card,
					id,
					costPerUnit,
					quoteQty,
					currCostPerUnit,
					currQuoteQty,
					profitLoss,
					profitLossPercent
				};

				if (isFinite(profitLossPercent)) {
					addTransaction(newTransaction);
				} else {
					throw new Error("Conversion data unavailable.");
				}
			}
			).catch(err => setOpenDialog({open: true, message: err}))
	};

	const addTransaction = (trans) => {
		if (!trans.quoteQty) return;
		setTransactions(prevState => ([...prevState, trans]));
	};
	
	const handleSubmit = (e) => {
		if (currentCard.baseQty && currentCard.baseUnits && currentCard.quoteUnits) {
			calculateCardData(currentCard)
		}
	};

	const handleChange = (e) => {
		setCurrentCard({
			...currentCard,
			[e.target.name]: parseFloat(e.target.value)
		});
	};

	const handleInputChange = (e,v,r) => {
		if (!e) return;
		const key = e.target.id.split("-")[0];

		if (r === "reset") {
			setCurrentCard({
				...currentCard,
				[key]: v,
			});
		}
	};

	const handleClear = () => {
		setCurrentCard({
			date: new Date(),
			quoteQty: 0,
			quoteUnits: null,
			baseQty: 0,
			baseUnits: null,
		});
	};

    return (
		<>
			<Grid container className={classes.card}>
				<div className={classes.cardRow1}>
					<InputDate
						id="inputDate"
						name="date"
						currentCard={currentCard}
						setCurrentCard={setCurrentCard}
					/>
				</div>
				<TextField
					id="baseQty"
					type="number" 
					label="Base amount"
					helperText="(how many you bought)"
					name="baseQty"
					value={currentCard.baseQty ? currentCard.baseQty : ""}
					onChange={handleChange}
					className={classes.cardRow2}
				/>
				<InputUnits
					id="baseUnits" 
					label="Base Units" 
					helperText="(what you bought)"
					value={currentCard.baseUnits}
					handleInputChange={handleInputChange}
					currentCard={currentCard}
					options={currencies.base}
					className={classes.cardRow3Col1}
				/>
				<InputUnits
					id="quoteUnits" 
					label="Quote Units" 
					helperText="(what you paid)"
					value={currentCard.quoteUnits}
					handleInputChange={handleInputChange}
					currentCard={currentCard}
					options={currencies.quote}
					className={classes.cardRow3Col2} 	
				/>
				<div className={classes.cardRow4}>
					<Divider />
					<InputActionButtons
						id="inputActionButtons" 
						handleSubmit={handleSubmit}
						handleClear={handleClear}
					/>
				</div>
			</Grid>
			<AlertDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
		</>
    );
};

TransactionCard.propTypes = {
	setTransactions: PropTypes.func,
	initialCard: PropTypes.object, 
};