const Router = require('express');

const routes = Router();

const employeeController = require('./app/controllers/employee.controller');

routes.get('/', (req, res) => {
    res.json({message: 'hello'})
});

// EMPLOYEES
// GET: /employees/ (employee list)
routes.get('/employees', employeeController.list);
// POST: /employees/ (employee create)
routes.post('/employees', employeeController.create);
// UPDATE /employees/ID/ (employee update)
routes.put('/employees/:id', employeeController.update);
// DELETE /employees/ID/ (employee delete)
routes.delete('/employees/:id', employeeController.remove);
// GET /employees/ID/ (employee detail)
routes.get('/employees/:id', employeeController.details);

module.exports = routes;