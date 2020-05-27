import React from "react";

// components
import { AppActionBar } from "../components/navigation/AppActionBar";

// style
import { Button, IconButton, TextField, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import ClearAllIcon from '@material-ui/icons/ClearAll';

const useStyles = makeStyles(theme => ({
    actionBarItem: {
        marginRight: theme.spacing(5),
    },
    actionButton: {
        ...theme.actionButton,
    },
}));

export const DisplayTableActionBar = props => {
    const { defaultCard, cardList, setCardList } = props;
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
                        disabled={cardList.length > 1 ? false : true}
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
