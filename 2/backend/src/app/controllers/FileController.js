const File = require('../models/File');

class FileController {
  async store(req, res) {
    const { originalname: name, filename } = req.file;

    const file = await File.create({
      name,
      filename,
    });

    return res.json(file);
  }
}

module.exports = new FileController();
