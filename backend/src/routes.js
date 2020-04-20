const { Router } = require('express');
const User = require('./app/models/User');


const routes = Router();

routes.get('/', async (req, res) => {
  const user = await User.findOne({ where: { name: 'Distribuidora FastFeet' } })

  return res.json(user);
});

module.exports = routes;
