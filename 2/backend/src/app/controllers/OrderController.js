const Deliveryman = require('../models/Deliveryman');

class OrderController{
  async index(req, res) {
    return res.json({message: 'ok'});
  }
} 

module.exports = new OrderController();