const Deliveryman = require('../models/Deliveryman');
const Delivery = require('../models/Delivery');

class OrderController{
  async index(req, res) {
    const { id } = req.params;
    const orders = await Deliveryman.findOne({
      where: { 
        id,
      },
      include: [ {
        model: Delivery,
        as: 'deliveries',
        where: {
          deliveryman_id: id,
        }
      }]
    });
    return res.json(orders);
  }
} 

module.exports = new OrderController();