'use strict';

const path = require('path');

// ==================================================

// Địa chỉ đến 1 file nhất định trong computer
module.exports = path.dirname(process.mainModule.filename);
