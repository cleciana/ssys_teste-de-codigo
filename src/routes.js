const Router = require('express');
const routes = Router();

const employeeController = require('./app/controllers/employee.controller');
const reportController = require('./app/controllers/report.controller');
const authController = require('./app/controllers/auth.controller');

// ROTAS PUBLICAS

routes.get('/', (req, res) => {
    res.json({message: 'Tudo ok por aqui :)'});
});
// POST: /login/ (Manager login)
routes.post('/login', authController.login);

// ROTAS PRIVADAS

// POST: /employees/ (employee create)
routes.post('/employees', authController.verifyJWT, employeeController.create);
// GET: /employees/ (employee list)
routes.get('/employees', authController.verifyJWT, employeeController.list);
// UPDATE /employees/ID/ (employee update)
routes.put('/employees/:id', authController.verifyJWT, employeeController.update);
// DELETE /employees/ID/ (employee delete)
routes.delete('/employees/:id', authController.verifyJWT, employeeController.remove);
// GET /employees/ID/ (employee detail)
routes.get('/employees/:id', authController.verifyJWT, employeeController.details);

// GET /reports/employees/salary/ (salary report)
//routes.get('/reports/employees/salary', reportController.salaryReport);
// GET /reports/employees/age/ (age report)
routes.get('/reports/employees/age', authController.verifyJWT, reportController.ageReport);

module.exports = routes;