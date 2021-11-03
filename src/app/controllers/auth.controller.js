require('dotenv/config');

const { Employee } = require('../models');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	try {
		const {email, password} = req.body;

		const employee = await Employee.findOne({
      where: {
        email,
        password
      }
  	});

		if (employee) {
			const id = employee.id;
			const token = jwt.sign({ id }, process.env.SECRET, {
				expiresIn: 86400 // expira em 24 horas
			});
			return res.status(200).json({	auth: true, token: token	});
		}
		return res.status(200).json({	auth: false, token: 'Dados de login inválidos'	});

	} catch (error) {
		return res.status(500).json({message: `Ops, houve um erro: ${error.message}`});
	}
}

const verifyJWT = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
      return res.status(401).json({message: 'O token é obrigatório'});
    }

		const parts = authHeader.split(' ');

    if (!parts.lenght === 2) {
      return res.status(401).json({ message: 'Token error ' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: 'Token malformatado' });
    }

		if (!token) {
			return res.status(401).json({
				auth: false, message: 'Token nao informado'
			});
		}
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return res.status(500).json({ 
					auth: false, message: `Autenticacao falhou: ${err.message}`
				});
			}
			req.userId = decoded.id;
			next();
		});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, houve um erro: ${error.message}`
		});
	}
}

module.exports = {
  login,
	verifyJWT
};