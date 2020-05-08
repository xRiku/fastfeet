const {
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isAfter,
  isEqual,
} = require('date-fns');

const Deliveryman = require('../models/Deliveryman');
const Delivery = require('../models/Delivery');

class OrderController {
  async index(req, res) {
    const { id } = req.params;
    const orders = await Deliveryman.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Delivery,
          as: 'deliveries',
          where: {
            deliveryman_id: id,
          },
        },
      ],
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

    const parsedDateStart = parseISO(start_date);

    const lowerLimit = setSeconds(
      setMinutes(setHours(parsedDateStart, 8), 0),
      0
    );
    const higherLimit = setSeconds(
      setMinutes(setHours(parsedDateStart, 18), 0),
      0
    );

    const validTime =
      (isAfter(parsedDateStart, lowerLimit) &&
        isBefore(parsedDateStart, higherLimit)) ||
      isEqual(parsedDateStart, higherLimit) ||
      isEqual(parsedDateStart, lowerLimit);
    if (!validTime) {
      return res.status(400).json({
        error: 'Start time should only be between 8:00 and 18:00',
      });
    }

    const updatedOrder = await order.update({ start_date });
    return res.json(updatedOrder);
  }
}

module.exports = new OrderController();
