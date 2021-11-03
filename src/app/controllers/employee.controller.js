const { Employee } = require('../models');

const create = async (req, res) => {
	try {
		const {
			name,email,department,salary,birth_date,password
		} = req.body;

		const employee = await Employee.create({
			name,email,department,salary,birth_date,password
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
		const id = req.userId;
		const employee = await Employee.findByPk(id);
		
		if (employee) {
			const employees = await Employee.findAll({
				attributes: ['id','name','email','department','salary','birth_date']
			});
	
			return res.status(200).json(employees);
		}
		return res.status(404).json({message: 'Usuario nao cadastrado'}); 		

	} catch (error) {
		return res.status(500).json({
			message: `Ops, houve um erro: ${error.message}`
		});
	}
}

const update = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.userId;

		if (id == userId) {
			const employee = await Employee.findByPk(id);

			const updated = await employee.update(req.body);

			return res.status(200).json(updated);
		}
		return res.status(403).json({
			message: "Voce nao tem permissao para realizar esta acao"
		});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, houve um erro: ${error.message}`
		});
	}
}

const remove = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.userId;

		if (id == userId) {
			await Employee.destroy({ where: {id:id} });
	
			return res.status(200).json({	message: `Deletado com sucesso`	});
		}
		return res.status(403).json({
			message: "Voce nao tem permissao para realizar esta acao"
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
		const userId = req.userId;

		if (id == userId) {
			const employee = await Employee.findByPk(id);

			return res.status(200).json(employee);
		}
		return res.status(403).json({
			message: "Voce nao tem permissao para realizar esta acao"
		});

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