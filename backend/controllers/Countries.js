const Models = require('../models');

exports.index = async (req, res) => {
  try {
    const countries = await Models.country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error: ' + error });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Models.country.findByPk(id);

    if (!country) {
      return res.status(404).json({ error: 'Country not found' + "with id " + id });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error: ' + error });
  }
};