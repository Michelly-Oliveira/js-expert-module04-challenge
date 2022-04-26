//  assert {type: "json"} -> required  to be able to import a json file (node v17)
import database from '../database.json' assert { type: 'json' };

import Person from './person.js';
import { save } from './repository.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERMINAL = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
	try {
		const answer = await terminalController.question(
			'Enter your info (1 Test,Test 100 2000-01-02 2000-01-02): \n'
		);

		if (answer === STOP_TERMINAL) {
			terminalController.closeTerminal();
			console.log('Process finished');

			return;
		}

		const isValidAnswer = Person.validatePerson(answer);

		if (!isValidAnswer) {
			throw new Error('Invalid format. Please try again');
		}

		const person = Person.generatePersonFromInput(answer);
		const formattedPerson = person.formatted(DEFAULT_LANG);

		terminalController.updateTable(formattedPerson);
		await save(person);

		return mainLoop();
	} catch (error) {
		console.log('!!!', error);
		console.log();

		return mainLoop();
	}
}

// top-level-await
await mainLoop();
