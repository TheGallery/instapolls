const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.login = function (profile, cb) {
  User.findOneAndUpdate({
    provider: profile.provider,
    providerId: profile.id
  }, {
    $setOnInsert: {
      name: profile.displayName,
      provider: profile.provider,
      providerId: profile.id,
      polls: []
    }
  }, {
    new: true,
    upsert: true
  }).exec(cb);
};

exports.getOne = function (id, cb) {
  User.findById(id).exec(cb);
};
