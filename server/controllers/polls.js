const mongoose = require('mongoose');
const Poll = mongoose.model('Poll');
const User = mongoose.model('User');
const Vote = mongoose.model('Vote');
const validator = require('../utils/validator');

exports.addPoll = function (data, user, cb) {
  if (validator.validatePoll(data)) {
    const poll = new Poll({
      name: data.name,
      createdBy: user.id,
      options: data.options.map(opt => ({name: opt, votes: 0}))
    });

    poll.save((err, poll) => {
      if (err) return cb(err);

      User.update({ _id: user.id }, {
        $push: {
          polls: poll.id
        }
      }, function (err, user) {
        if (err) return cb(err);

        return cb(null, poll);
      });
    });
  } else {
    return cb({error: 'Validation error.'});
  }
};

exports.getAll = function (cb) {
  Poll.find({})
    .populate({path: 'createdBy', select: 'name -_id'})
    .sort({createdAt: -1})
    .exec(cb);
};

exports.delete = function (pollId, user, cb) {
  Poll.findOneAndRemove({_id: pollId, createdBy: user._id})
    .exec(function (err, poll) {
      if (err) return cb(err);

      Vote.remove({pollId: pollId})
        .exec(function (err) {
          if (err) return cb(err);

          User.update({_id: user._id}, {
            $pull: {
              polls: pollId
            }
          }).exec(cb);
        });
    });
};
