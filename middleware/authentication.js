'use strict';

const User = require('../models/User');

// ==================================================

exports.authToken = (req, res, next) => {
  const token = req.query.token;

  // Kiểm tra xem có token hay không
  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  // Kiểm tra xem token có đúng không
  User.fetchAll((userTokens) => {
    const userToken = userTokens.find((u) => u.token === token);

    if (!userToken) return res.status(401).send({ message: 'Unauthorized' });

    next();
  });
};
