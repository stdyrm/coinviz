// WRAPPER COMPONENT (UnitSelector, DateSelector)

import React from 'react';
import PropTypes from 'prop-types';

import { DateSelector } from '../../../components/selectors/DateSelector';
import { UnitSelector } from '../../../components/selectors/UnitSelector';

export const Selector = (props) => {
	const { cryptoParams, handleChange, handleDeselect } = props;
	return (
		<>
			<UnitSelector 
				baseList={cryptoParams}
				quoteList={false}
				handleChange={handleChange}
				handleDeselect={handleDeselect}
			/>
		</>
	)
};

Selector.propTypes = {
	cryptoParams: PropTypes.object,
	handleChange: PropTypes.func,
	handleDeselect: PropTypes.func
};
