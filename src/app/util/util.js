const { Manager, Employee } = require('../models');

function avg(value1, value2) {
	return (value1 + value2) / 2;
}

async function managerIsRegistred(userId) {
	const manager = await Manager.findByPk(userId);

	if (manager) return true;
	return false;
}

async function findEmployeeByBirthDate(birthDate) {
	return await Employee.findOne({
		attributes: ['id','name','email','department','salary','birth_date'],
		where: {birth_date: birthDate}
	});
}

async function findEmployeeBySalary(salary) {
	return await Employee.findOne({
		attributes: ['id','name','email','department','salary','birth_date'],
		where: {salary: salary}
	});
}

module.exports = {
	avg,
	managerIsRegistred,
	findEmployeeByBirthDate,
	findEmployeeBySalary
}