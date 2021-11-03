const { Manager, Employee } = require('../models');

const ageReport = async (req, res) => {
	try {
		const managerId = req.userId;
		const manager = await Manager.findByPk(managerId);

		if (manager) {
			const youngerBirth = await Employee.min('birth_date');
			const olderBirth = await Employee.max('birth_date');

			const younger = await Employee.findOne({
				attributes: ['id','name','email','department','salary','birth_date'],
				where: {birth_date: youngerBirth}
			});
			const older = await Employee.findOne({
				attributes: ['id','name','email','department','salary','birth_date'],
				where: {birth_date: olderBirth}
			});
			
			const average = (
				Employee.getEmployeeAge(new Date(younger.birth_date)) + 
				Employee.getEmployeeAge(new Date(older.birth_date))
			) / 2;

			return res.status(200).json({younger, older, average});
		}

		return res.status(404).json({message: 'Manager not registered'});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

const salaryReport = async (req, res) => {
	try {
		const managerId = req.userId;
		const manager = await Manager.findByPk(managerId);

		if (manager) {
			const lowestSalary = await Employee.min('salary');
			const highestSalary = await Employee.max('salary');

			const lowest = await Employee.findOne({
				attributes: ['id','name','email','department','salary','birth_date'],
				where: {salary: lowestSalary}
			});
			const highest = await Employee.findOne({
				attributes: ['id','name','email','department','salary','birth_date'],
				where: {salary: highestSalary}
			});
			const average = (lowestSalary + highestSalary) / 2;

			return res.status(200).json({lowest, highest, average});
		}

		return res.status(404).json({message: 'Manager not registered'});

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