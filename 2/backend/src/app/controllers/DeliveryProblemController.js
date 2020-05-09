const DeliveryProblem = require('../models/DeliveryProblem');
const Delivery = require('../models/Delivery');
const Deliveryman = require('../models/Deliveryman');

class DeliveryProblemController {
  async store(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman id is invalid' });
    }

    const { delivery_id } = req.body;

    if (!delivery_id) {
      return res.status(400).json({ error: 'Delivery id not specified' });
    }
    const delivery = await Delivery.findByPk(delivery_id);

    if (delivery.deliveryman_id !== deliveryman.id) {
      return res.status(401).json({
        error: "Deliveryman should not edit another person's delivery}",
      });
    }

    const problem = await DeliveryProblem.create(req.body);

    return res.json(problem);
  }

  async index(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: 'Invalid delivery id' });
    }
    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: id },
    });

    return res.json(problems);
  }
}

module.exports = new DeliveryProblemController();
