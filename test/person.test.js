import mocha from 'mocha';
import chai from 'chai';
import sinon from 'sinon';

import Person from '../src/person.js';
import formatter from '../src/helpers/format.js';

const { describe, it } = mocha;
const { expect } = chai;

describe('Person Test Suite', () => {
	let sandbox = {};

	beforeEach(() => {
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should return a person instance from a string', async () => {
		const person = Person.generatePersonFromInput('2 Motocicleta,Carro 500 2009-01-01 2020-11-26');

		const expectedResult = {
			id: '2',
			vehicles: ['Motocicleta', 'Carro'],
			kmTraveled: '500',
			from: '2009-01-01',
			to: '2020-11-26',
		};

		expect(person).to.be.deep.equal(expectedResult);
	});

	it('should format the values', async () => {
		const person = new Person({
			id: '2',
			vehicles: ['Motocicleta', 'Carro'],
			kmTraveled: '500',
			from: '2009-01-01',
			to: '2009-01-01',
		});

		sandbox.stub(formatter, formatter.formatList.name).returns('Motocicleta e Carro');
		sandbox.stub(formatter, formatter.formatNumber.name).returns('500 km');
		sandbox.stub(formatter, formatter.formatDate.name).returns('01 de janeiro de 2009');

		const formattedPerson = person.formatted('pt-BR');

		const expectedResult = {
			id: 2,
			vehicles: 'Motocicleta e Carro',
			kmTraveled: '500 km',
			from: '01 de janeiro de 2009',
			to: '01 de janeiro de 2009',
		};

		expect(formattedPerson).to.be.deep.equal(expectedResult);
	});

	it('should successfully validate the input when the format of the string is correct', () => {
		const input = '2 Motocicleta,Carro 500 2009-01-01 2020-11-26';
		const inputTwo = '2 Motocicleta 500 2009-01-01 2020-11-26';

		const isInputValid = Person.validatePerson(input);
		const isInputTwoValid = Person.validatePerson(inputTwo);

		expect(isInputValid).to.be.true;
		expect(isInputTwoValid).to.be.true;
	});

	it('should fail to validate the input when the format of the string is incorrect', () => {
		const input = '2 Motocicleta Carro 500 2009-01-01 2020-11-26';

		const isInputValid = Person.validatePerson(input);

		expect(isInputValid).to.be.false;
	});
});
