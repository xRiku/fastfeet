const Recipient = require('../models/Recipient');

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    const updatedRecipient = await recipient.update(req.body);

    return res.json(updatedRecipient);
  }
}

module.exports = new RecipientController();
