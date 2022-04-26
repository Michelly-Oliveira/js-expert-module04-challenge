import formatter from './helpers/format.js';

export default class Person {
	constructor({ id, vehicles, kmTraveled, from, to }) {
		this.id = id;
		this.vehicles = vehicles;
		this.kmTraveled = kmTraveled;
		this.from = from;
		this.to = to;
	}

	formatted(language) {
		return {
			id: Number(this.id),
			vehicles: formatter.formatList(language, this.vehicles),
			kmTraveled: formatter.formatNumber(language, this.kmTraveled),
			from: formatter.formatDate(language, this.from),
			to: formatter.formatDate(language, this.to),
		};
	}

	// this method does not work with the person instance, so it's a static method
	// it generates a new instance -> Person.generatePersonFromInput
	static generatePersonFromInput(text) {
		const EMPTY_SPACE = ' ';
		const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE);

		const person = new Person({
			id,
			kmTraveled,
			from,
			to,
			vehicles: vehicles.split(','),
		});

		return person;
	}

	static validatePerson(text) {
		// 1 Test,Test 100 2000-01-02 2000-01-02
		const validator =
			/(^[0-9]+) ([A-Z]+(,[A-Z]+?){0,}) ([0-9]+) ([0-9]{4}-[0-9]{2}-[0-9]{2}) ([0-9]{4}-[0-9]{2}-[0-9]{2})/gi;

		const isValid = validator.test(text);

		return isValid;
	}
}
