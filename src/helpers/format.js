const formatList = (language, data) => {
	const formattedList = new Intl.ListFormat(language, {
		style: 'long',
		type: 'conjunction',
	}).format(data);

	return formattedList;
};

const formatNumber = (language, data) => {
	const formattedNumber = new Intl.NumberFormat(language, {
		style: 'unit',
		unit: 'kilometer',
	}).format(data);

	return formattedNumber;
};

const formatDate = (language, data) => {
	const createDate = (date) => {
		// convert each item to a number
		const [year, month, day] = date.split('-').map(Number);

		return new Date(year, month - 1, day);
	};

	const date = createDate(data);

	const formattedDate = new Intl.DateTimeFormat(language, {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	}).format(date);

	return formattedDate;
};

export default {
	formatList,
	formatDate,
	formatNumber,
};
