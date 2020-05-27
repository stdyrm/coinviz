import React from "react";
import PropTypes from "prop-types";

// style
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export const InputUnits = props => {
    const {
        id,
        label,
        helperText,
        options,
        handleInputChange,
    } = props;

    return (
        <Autocomplete
            id={id}
            options={options}
            onInputChange={handleInputChange}
            renderInput={params => (
                <TextField {...params} label={label} helperText={helperText} />
            )}
            getOptionLabel={option => option.label}
            clearOnEscape
            selectOnFocus
            autoHighlight
        />
    );
};

InputUnits.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleInputChange: PropTypes.func,
};
