import React from "react";
import PropTypes from "prop-types";

// style
import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const useStyles = makeStyles(theme => ({
    buttonContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    button: {
        ...theme.actionButton,
        color: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: "transparent",
            color: theme.palette.primary.light,
            opacity: 1,
        },
        "&#clearCardButton": {
            color: theme.palette.secondary.main,
        },
    },
}));

export const InputActionButtons = props => {
    const { handleSubmit, handleClear } = props;
    const classes = useStyles();

    return (
        <div className={classes.buttonContainer}>
            <Tooltip title="Add to table">
                <IconButton
                    id="addToTableButton"
                    className={classes.button}
                    onClick={handleSubmit}
                >
                    <PlaylistAddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Clear">
                <IconButton
                    id="clearCardButton"
                    className={classes.button}
                    onClick={handleClear}
                >
                    <ClearIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};

InputActionButtons.propTypes = {
    handleSubmit: PropTypes.func,
    handleClear: PropTypes.func,
};
