const {
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isAfter,
  isEqual,
  startOfDay,
  endOfDay,
} = require('date-fns');

const { Op } = require('sequelize');

const Deliveryman = require('../models/Deliveryman');
const Delivery = require('../models/Delivery');
const File = require('../models/File');

class OrderController {
  async index(req, res) {
    const { id } = req.params;
    let { delivered = true } = req.query;

    if (delivered === 'false') {
      delivered = false;
    }

    if (!delivered) {
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
            end_date: {
              [Op.ne]: null,
            },
          },
        },
      ],
    });

    orders.deliveries.map(async (delivery) => {
      delivery.file = await File.findOne({
        where: {
          id,
        },
      });
    });

    return res.json(orders);
  }

  async update(req, res) {
    const { id, order_id } = req.params;
    const order = await Delivery.findByPk(order_id);
    const { removal, deliveryFinished } = req.body;
    const todaysDate = new Date();
    const start_date = new Date();

    if (deliveryFinished) {
      const { signature_id } = req.body;
      if (!signature_id) {
        return res
          .status(400)
          .json({ error: 'Image is not specified or id is invalid' });
      }
      const end_date = new Date();
      const updatedOrder = await order.update({ signature_id, end_date });
      return res.json(updatedOrder);
    }

    if (!order) {
      return res.status(400).json({ error: 'Order is not available' });
    }

    if (order.deliveryman_id !== Number(id)) {
      return res.status(401).json({ error: 'Invalid id' });
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

    const orderCounter = await Delivery.count({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [startOfDay(todaysDate), endOfDay(todaysDate)],
        },
      },
    });

    if (orderCounter >= 5 && removal === true) {
      return res.status(400).json({
        error: 'Deliveryman can only make up to 5 deliveries per day',
      });
    }

    const updatedOrder = await order.update({ start_date });
    return res.json(updatedOrder);
  }
}

module.exports = new OrderController();
