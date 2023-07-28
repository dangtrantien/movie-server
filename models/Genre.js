'use strict';

const path = require('path');
const fs = require('fs');

// ==================================================

const pathDr = path.join(__dirname, '..', 'data', 'genreList.json');

module.exports = class Genre {
  static fetchAll(callback) {
    const data = fs.readFileSync(pathDr);

    callback(JSON.parse(data));
  }
};
