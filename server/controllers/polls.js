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
      if (err) console.log(err);
      User.update(
        {_id: user.id},
        {$push: {polls: poll.id}},
        function (err, user) {
          cb(err, poll);
        }
      );
    });
  } else {
    cb({error: 'Validation error.'});
  }
};

exports.getAll = function (cb) {
  Poll.find({})
    .populate({path: 'createdBy', select: 'name -_id'})
    .exec(cb);
};

exports.delete = function (pollId, user, cb) {
  Poll.findOneAndRemove({_id: pollId, createdBy: user._id})
    .exec(function (err, poll) {
      Vote.remove({pollID: pollId})
        .exec(function (err) {
          User.update({_id: user._id}, {
            $pull: {
              polls: pollId
            }
          }).exec(function (err) {
            cb(err);
          });
        });
    });
};
