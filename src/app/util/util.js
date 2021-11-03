const { Manager } = require('../models');

function avg(value1, value2) {
	return (value1 + value2) / 2;
}

async function managerIsRegistred(userId) {
	const manager = await Manager.findByPk(userId);

	if (manager) return true;
	return false;
}

module.exports = {
	avg,
	managerIsRegistred
}