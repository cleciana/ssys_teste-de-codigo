const Router = require('express');

const routes = Router();

routes.get('/', (req, res) => {
    res.json({message: 'hello'})
});

module.exports = routes;