const { Employee } = require('../models');

const create = async (req, res) => {
	try {
		const {
			name,email,department,salary,birth_date
		} = req.body;

		const employee = await Employee.create({
			name,email,department,salary,birth_date
		});

		return res.status(201).json(employee);

	} catch (error) {
		return res.status(500).json({
			message: `Ops, houve um erro: ${error.message}`
		});
	}
}

const list = async (req, res) => {
	try {
		const employees = await Employee.findAll({
			attributes: ['id','name','email','department','salary','birth_date']
		});

		return res.status(200).json(employees);

	} catch (error) {
		return res.status(500).json({
			message: `Ops, houve um erro: ${error.message}`
		});
	}
}

const update = async (req, res) => {
	try {
		const { id } = req.params;

		const employee = await Employee.findByPk(id);

		const updated = await employee.update(req.body);

		return res.status(200).json(updated);

	} catch (error) {
		return res.status(500).json({
			message: `Ops, houve um erro: ${error.message}`
		});
	}
}

const remove = async (req, res) => {
	try {
		const id = req.params;

		await Employee.destroy({
			where: id
		});

		return res.status(200).json({
			message: `Deletado com sucesso`
		});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, houve um erro: ${error.message}`
		});
	}
}

const details = async (req, res) => {
	try {
		const {id} = req.params;

		const employee = await Employee.findByPk(id);

		return res.status(200).json(employee);

	} catch (error) {
		return res.status(500).json({
			message: `Ops, houve um erro: ${error.message}`
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