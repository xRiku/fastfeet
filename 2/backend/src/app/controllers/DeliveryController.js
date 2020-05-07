const Delivery = require("../models/Delivery");
const Recipient = require("../models/Recipient");
const Deliveryman = require("../models/Deliveryman");

class DeliveryController {
  async store(req, res) {
    const { recipient_id, deliveryman_id } = req.body;
    const checkRecipientExists = await Recipient.findByPk(recipient_id);
    const checkDeliverymanExists = await Deliveryman.findByPk(deliveryman_id);
    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    if (!checkDeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const order = await Delivery.create(req.body);
    return res.json(order);
  }

  async index(req, res) {
    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);
    await delivery.destroy();
    return res.json({ message: 'Order was succesfully deleted' });
  }
};

module.exports = new DeliveryController();