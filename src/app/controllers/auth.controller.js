require('dotenv/config');

const { Manager } = require('../models');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	try {
		const {email, password} = req.body;

		const manager = await Manager.findOne({
      where: {
				email,
				password
      }
  	});

		if (manager) {
			const id = manager.id;
			const token = jwt.sign({ id }, process.env.SECRET, {
				expiresIn: 86400 // expira em 24 horas
			});
			return res.status(200).json({	auth: true, token: token	});
		}
		return res.status(404).json({	auth: false, token: 'Invalid login  credentials or manager not registered'	});

	} catch (error) {
		return res.status(500).json({message: `Ops, an error occurred: ${error.message}`});
	}
}

const verifyJWT = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
      return res.status(401).json({message: 'Authorization token is mandatory'});
    }

		const parts = authHeader.split(' ');

    if (!parts.lenght === 2) {
      return res.status(401).json({ message: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: 'Bad token' });
    }

		if (!token) {
			return res.status(401).json({
				auth: false, message: 'Token not provided'
			});
		}
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return res.status(500).json({ 
					auth: false, message: `Authorization failed: ${err.message}`
				});
			}
			req.userId = decoded.id;
			next();
		});

	} catch (error) {
		return res.status(500).json({
			message: `Ops, an error occurred: ${error.message}`
		});
	}
}

module.exports = {
  login,
	verifyJWT
};