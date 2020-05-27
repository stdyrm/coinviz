import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { json } from 'd3';
import { normalizeData } from './normalizeData';

const api = process.env.REACT_APP_API_CC;

export const DataImportDailyPairOHLCV = (props) => {
	const { setData, cryptoParams } = props;
	const { toTimestamp } = props.chartParams;
	const numDays = 1000;
	const filteredCrypto = Object.keys(cryptoParams).filter(d => cryptoParams[d].selected === true);

	console.log(filteredCrypto);
	
	const getData = async () => {
		let revData = [];

		await filteredCrypto.forEach((d,i) => {
			if (filteredCrypto.length === 0) {
				setData([]);
			}
			json(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${d}&tsym=USD&limit=${numDays}&toTs=${toTimestamp}&tryConversion=false&api_key=${api}`)
				.then(res => {
					revData.push(normalizeData(res.Data.Data, d, "USD"));
					// normalize === true
					// ? revData[d] = normalizeData(res.Data.Data)
					// : revData[d] = res.Data.Data;
					if (i + 1 === filteredCrypto.length) {
						console.log('data set!')
						setData(revData);
					}
				});
		});
	};
	
	useEffect(() => {
		getData();
	}, [cryptoParams]);

	return null;
};

DataImportDailyPairOHLCV.propTypes = { 
	setData: PropTypes.func,
	cryptoParams: PropTypes.object,
	fiatParams: PropTypes.object
};
