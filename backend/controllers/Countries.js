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

    country.dataValues.flagLink = `https://flagcdn.com/192x144/${country.dataValues.country_code.toLowerCase()}.png`;
    country.dataValues.googleLink = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}=${country.dataValues.name}`

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error: ' + error });
  }
};