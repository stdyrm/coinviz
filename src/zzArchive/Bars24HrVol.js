// WRAPPER COMPONENT

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { Bars } from '../components/templates/Bars';

export const Bars24HrVol = (props) => {
	const { data, scales, wrapper, bounds } = props;

	return (
		<>
			{scales
				? <Bars data={data} scales={scales} />
				: <></>
			}
		</>
	)
};