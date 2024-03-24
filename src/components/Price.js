import React, { memo } from 'react';
import CurrencyFormat from 'react-currency-format';

export default memo(function Price({ value }) {
	return (
		<CurrencyFormat
			value={value}
			displayType={'text'}
			thousandSeparator={true}
			prefix={'$'}
		/>
	);
});
