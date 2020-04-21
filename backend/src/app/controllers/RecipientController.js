const Recipient = require('../models/Recipient');

class RecipientController {
  async store(req, res){
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }
}

module.exports = new RecipientController();