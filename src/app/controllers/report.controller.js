const { Employee } = require('../models');

const util = require('../util/util');

const ageReport = async (req, res) => {
	try {
		if (util.managerIsRegistred(req.userId)) {
			const olderBirth = await Employee.min('birth_date');
			const youngerBirth = await Employee.max('birth_date');

			const younger = util.findEmployeeByBirthDate(youngerBirth);

			const older = util.findEmployeeByBirthDate(olderBirth);

			return res.status(200).json({
				younger, older, average: util.avg(
					Employee.getEmployeeAge(new Date(younger.birth_date)), 
					Employee.getEmployeeAge(new Date(older.birth_date)))
			});
		}
		return res.status(404).json({ message: 'Manager not registered' });

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

const salaryReport = async (req, res) => {
	try {
		if (util.managerIsRegistred(req.userId)) {
			const lowestSalary = await Employee.min('salary');
			const highestSalary = await Employee.max('salary');

			const lowest = util.findEmployeeBySalary(lowestSalary);
			const highest = util.findEmployeeBySalary(highestSalary);

			return res.status(200).json({
				lowest, highest, average: util.avg(lowestSalary, highestSalary)
			});
		}
		return res.status(404).json({ message: 'Manager not registered' });

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

module.exports = {
	ageReport,
	salaryReport
};