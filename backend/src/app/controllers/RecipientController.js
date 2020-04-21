const Recipient = require('../models/Recipient');

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    return res.json({text: 'ok'});
  }
}

module.exports = new RecipientController();