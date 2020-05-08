const Deliveryman = require('../models/Deliveryman');
const Delivery = require('../models/Delivery');

class OrderController {
  async index(req, res) {
    const { id } = req.params;
    const orders = await Deliveryman.findOne({
      where: {
        id,
      },
      include: [{
        model: Delivery,
        as: 'deliveries',
        where: {
          deliveryman_id: id,
        }
      }]
    });
    return res.json(orders);
  }

  async update(req, res) {
    const { id, order_id } = req.params;
    const order = await Delivery.findByPk(order_id);
    const { start_date } = req.body;
    if (!order) {
      return res.status(400).json({ error: 'Order is not available' });
    }


  }
}

module.exports = new OrderController();