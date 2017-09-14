const mongoose = require('mongoose');
const Vote = mongoose.model('Vote');
const Poll = mongoose.model('Poll');

exports.addVote = function (id, option, user, cb) {
  // If it's an object, the user is registered, otherwise a guest
  const userId = (typeof user === 'object') ? user._id : user;

  const vote = new Vote({
    userType: (typeof user === 'object') ? 'registered' : 'guest',
    userId: userId,
    pollId: id,
    voteVal: option
  });

  Vote.findOne({userId: userId, pollId: id})
    .exec(function (err, voteDoc) {
      if (err) return cb(err);

      // User hasn't voted. Proceed.
      if (!voteDoc) {
        // If this query returns a poll, guests and registered users can vote.
        // If poll is null, only registered users can add new vote options
        Poll.findOneAndUpdate({_id: id, 'options.name': option}, {
          $inc: {
            totalVotes: 1,
            'options.$.votes': 1
          }
        }, {
          new: true
        }).exec(function (err, poll) {
          if (err) return cb(err);

          // Make sure only registered users can add new options
          if (!poll && (typeof user === 'object')) {
            Poll.findOneAndUpdate({_id: id}, {
              $push: {
                options: {
                  name: option,
                  votes: 1
                }
              }
            }).exec(function (err, poll) {
              if (err) return cb(err);

              vote.save(function (err, vote) {
                if (err) return cb(err);

                cb(null, poll);
              });
            });
          } else if (!poll && typeof user === 'string') {
            return cb({'error': 'Guests can\'t add new options.'});
          } else {
            vote.save(function (err) {
              if (err) return cb(err);

              cb(null, poll);
            });
          }
        });
      } else {
        // User has already voted and trying to cheat the system.
        // Throw them a generic message to confuse them.
        cb({'error': 'User has already voted.'});
      }
    });
};

exports.removeVote = function (pollId, user, cb) {
  // If it's an object, the user is registered, otherwise a guest
  const userId = (typeof user === 'object') ? user._id : user;

  Vote.findOneAndRemove({pollId: pollId, userId: userId})
    .exec(function (err, vote) {
      if (err) return cb(err);

      Poll.findOneAndUpdate({_id: pollId, 'options.name': vote.voteVal}, {
        $inc: {
          totalVotes: -1,
          'options.$.votes': -1
        }
      }, {
        new: true
      }).exec(cb);
    });
};

exports.getVotes = function (user, cb) {
  // If it's an object, the user is registered, otherwise a guest
  const userId = (typeof user === 'object') ? user._id : user;

  Vote.find({userId: userId}, 'pollId -_id').exec(cb);
};
