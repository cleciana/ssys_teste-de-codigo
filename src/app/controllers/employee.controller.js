const { Employee, Manager } = require('../models');

const create = async (req, res) => {
	try {
		const managerId = req.userId;
		const manager = await Manager.findByPk(managerId);

		if (manager) {
			const {
				name,email,department,salary,birth_date
			} = req.body;
	
			const employee = await Employee.create({
				name,email,department,salary,birth_date
			});
	
			return res.status(201).json(employee);
		}
		return res.status(404).json({message: 'Manager not registered'});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

const list = async (req, res) => {
	try {
		const managerId = req.userId;
		const manager = await Manager.findByPk(managerId);
		
		if (manager) {
			const employees = await Employee.findAll({
				attributes: ['id','name','email','department','salary','birth_date']
			});
	
			return res.status(200).json(employees);
		}
		return res.status(404).json({message: 'Manager not registered'}); 		

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

const update = async (req, res) => {
	try {
		const { id } = req.params;
		const managerId = req.userId;
		const manager = await Manager.findByPk(managerId);

		if (manager) {
			const employee = await Employee.findByPk(id);

			const updated = await employee.update(req.body);

			return res.status(200).json(updated);
		}
		return res.status(404).json({message: 'Manager not registered'});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

const remove = async (req, res) => {
	try {
		const id = req.params.id;
		const managerId = req.userId;
		const manager = await Manager.findByPk(managerId);

		if (manager) {
			await Employee.destroy({ where: {id:id} });
	
			return res.status(200).json({	message: `Deleted successfully`	});
		}
		return res.status(404).json({message: 'Manager not registered'});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

const details = async (req, res) => {
	try {
		const {id} = req.params;
		const managerId = req.userId;
		const manager = await Manager.findByPk(managerId);

		if (manager) {
			const employee = await Employee.findByPk(id);

			return res.status(200).json(employee);
		}
		return res.status(404).json({message: 'Manager not registered'});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

module.exports = {
	create,
	list,
	update,
	remove,
	details
};