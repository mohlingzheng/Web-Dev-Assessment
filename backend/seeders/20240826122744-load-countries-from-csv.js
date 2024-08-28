'use strict';

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, "..", 'data', 'country.csv');
    const countries = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          countries.push({
            name: row.name,
            capital: row.capital,
            currency: row.currency,
            country_code: row.country_code,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
        .on('end', async () => {
          try {
            await queryInterface.bulkInsert('Countries', countries, {});
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};
