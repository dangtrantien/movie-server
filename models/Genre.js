'use strict';

const path = require('path');
const fs = require('fs');

const rootDr = require('../util/path');

// ==================================================

const pathDr = path.join(rootDr, 'data', 'genreList.json');

module.exports = class Genre {
  static fetchAll(callback) {
    const data = fs.readFileSync(pathDr);

    callback(JSON.parse(data));
  }
};
