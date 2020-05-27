import React from "react";
import PropTypes from "prop-types";

// components
import { AppActionBar } from "../components/navigation/AppActionBar";

// style
import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearAllIcon from '@material-ui/icons/ClearAll';

const useStyles = makeStyles(theme => ({
    actionBarItem: {
    },
    actionButton: {
        ...theme.actionButton,
    },
}));

export const TransactionTableActionBar = props => {
    const { defaultCard, setCardList } = props;
    const classes = useStyles();

    const handleAddCard = () => {
        setCardList(prevState => [...prevState, defaultCard]);
    };

    const handleRemoveCard = () => {
        setCardList(prevState => prevState.slice(0, -1));
    };

    const handleResetCards = () => {
        setCardList(prevState => ([defaultCard]));
	};

    return (
        <AppActionBar>
            <span className={classes.actionBarItem}>
				<Tooltip title="Reset all cards">
					<IconButton
						className={classes.actionButton}
						onClick={handleResetCards}
					>
						<ClearAllIcon />
					</IconButton>
				</Tooltip>
                <Tooltip title="Remove card">
                    <IconButton
                        className={classes.actionButton}
                        onClick={handleRemoveCard}
                    >
                        <RemoveIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="New card">
                    <IconButton
                        className={classes.actionButton}
                        onClick={handleAddCard}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
			</span>
        </AppActionBar>
    );
};
