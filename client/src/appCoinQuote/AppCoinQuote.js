import React, { useState } from "react";

// components
import { AppTitle, Navbar, ParamDrawerSection } from "../sharedComponents/navigation";
import { TransactionCard } from "./inputs/TransactionCard";
import { TransactionTable } from "./interface/TransactionTable";
import { AggregatedCardList } from "./interface/AggregatedCardList";
import { ChartAggregated } from "./charts/ChartAggregated";

// params
import { navbarParams, appMenuParams } from "./appParams";

// styles
import { List, Grid, Toolbar, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
		gridTemplateColumns: "repeat(5, 1fr)",
		gridTemplateRows: "auto",
		[theme.breakpoints.up("md")]: {
			marginLeft: 220,
			flexGrow: 1,
		},
	},
	row1: {
		gridColumn: "1 / 6",
		gridRow: "1",
	},
	row2: {
		gridColumn: "1 / 6",
		gridRow: "2",
		marginTop: theme.spacing(1),
		backgroundColor: theme.palette.background.paper
	},
	row3: {
		gridColumn: "1 / 6",
		gridRow: "3",
		marginTop: theme.spacing(1),
		backgroundColor: theme.palette.background.paper
	},
	row4: {
		gridColumn: "1 / 6",
		marginTop: theme.spacing(1),
		gridRow: "4",	
	},
	paramDrawer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
}));

export const AppCoinQuote = () => {
	const [transactions, setTransactions] = useState([]);
	const [aggregated, setAggregated] = useState({});

	const classes = useStyles();

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
		<div  />
        <Grid className={classes.appWrapper}>
			<Grid item className={classes.row1}>
				<AppTitle title="Coin Quote App" variant="h5" divider="none" />
            </Grid>
			<Paper className={classes.row2} square>
				<AggregatedCardList
					transactions={transactions} 
					title="Aggregated Info"
					aggregated={aggregated}
					setAggregated={setAggregated} 
				/>
			</Paper>
			{transactions.length > 0
				&& <Paper className={classes.row3} square>
					<ChartAggregated 
						aggregated={aggregated}
						setAggregated={setAggregated} 
					/>
				</Paper>
			}
			<Grid item className={classes.row4}>
				<TransactionTable 
					transactions={transactions}
					setTransactions={setTransactions}
				/>
			</Grid>
        </Grid>
		</>
    );
};
