import React from "react";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export const InputDate = (props) => {
	const { currentCard, setCurrentCard } = props;

	const handleSelectedDate = (e) => {
		setCurrentCard(prevState => ({
			...prevState,
			date: String(e.toLocaleDateString()),
		}));
	};

    return (
		<>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
				variant="inline"
				value={currentCard.date}
				onChange={handleSelectedDate}
                disableFuture
                autoOk
                format="MM/dd/yyyy"
            />
        </MuiPickersUtilsProvider>
		</>
    );
};

InputDate.propTypes = {
	currentCard: PropTypes.object.isRequired,
	setCurrentCard: PropTypes.func.isRequired,
};
