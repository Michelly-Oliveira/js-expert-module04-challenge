import mocha from 'mocha';
import chai from 'chai';

import formatter from '../../src/helpers/format.js';

const { describe, it } = mocha;
const { expect } = chai;

const DEFAULT_LANG = 'pt-BR';

describe('Formatter Test Suite', () => {
	it('should correctly format a list of elemets to the defined styled', () => {
		const list = ['Car', 'Truck', 'Bike'];
		const expectedResult = 'Car, Truck e Bike';

		const formattedList = formatter.formatList(DEFAULT_LANG, list);

		expect(formattedList).to.be.deep.equal(expectedResult);
	});

	it('should correctly format a number to the defined styled', () => {
		const number = 100;
		const expectedResult = '100 km';

		const formattedList = formatter.formatNumber(DEFAULT_LANG, number);

		expect(formattedList).to.be.deep.equal(expectedResult);
	});

	it('should correctly format a list of elemets', () => {
		const date = '2022-04-01';
		const expectedResult = '01 de abril de 2022';

		const formattedList = formatter.formatDate(DEFAULT_LANG, date);

		expect(formattedList).to.be.deep.equal(expectedResult);
	});
});
