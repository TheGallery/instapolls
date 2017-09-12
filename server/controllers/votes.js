const mongoose = require('mongoose');
const Vote = mongoose.model('Vote');
const Poll = mongoose.model('Poll');

/*exports.addVote = function (id, option, user, cb) {
  const userId = (typeof user === 'object') ? user._id : user;

  const vote = new Vote({
    userType: (typeof user === 'object') ? 'registered' : 'guest',
    userID: userId,
    pollID: id,
    voteVal: option
  });

  Vote.findOne({userID: userId, pollID: id})
    .exec(function (err, voteDoc) {
      if (err) return console.log(err);

      // User hasn't voted. Proceed.
      if (!voteDoc) {
        vote.save(function (err, vote) {
          if (err) console.log(err);

          Poll.findOneAndUpdate({_id: id, 'options.name': option}, {
            $inc: {
              totalVotes: 1,
              'options.$.votes': 1
            }
          }, {
            new: true
          }).exec(function (err, poll) {
            if (err) console.log(err);

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
                if (err) console.log(err);

                cb(poll);
              });
            } else {
              cb(poll);
            }
          });
        });
      } else {
        // User has already voted and trying to cheat the system.
        // Throw them a generic message to confuse them.
        cb(false);
      }
    });
};*/

exports.addVote = function (id, option, user, cb) {
  const userId = (typeof user === 'object') ? user._id : user;

  const vote = new Vote({
    userType: (typeof user === 'object') ? 'registered' : 'guest',
    userID: userId,
    pollID: id,
    voteVal: option
  });

  Vote.findOne({userID: userId, pollID: id})
    .exec(function (err, voteDoc) {
      if (err) return console.log(err);

      // User hasn't voted. Proceed.
      if (!voteDoc) {
        Poll.findOneAndUpdate({_id: id, 'options.name': option}, {
          $inc: {
            totalVotes: 1,
            'options.$.votes': 1
          }
        }, {
          new: true
        }).exec(function (err, poll) {
          if (err) console.log(err);

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
              if (err) console.log(err);

              vote.save(function (err, vote) {
                if (err) console.log(err);
                cb(poll);
              });
            });
          } else if (!poll && typeof user === 'string') {
            cb(poll);
          } else {
            vote.save(function (err) {
              if (err) console.log(err);
              cb(poll);
            });
          }
        });
      } else {
        // User has already voted and trying to cheat the system.
        // Throw them a generic message to confuse them.
        cb(false);
      }
    });
};

exports.removeVote = function (pollId, user, cb) {
  const userId = (typeof user === 'object') ? user._id : user;

  Vote.findOneAndRemove({pollID: pollId, userID: userId})
  .exec(function (err, vote) {
    if (err) return console.log(err);

    Poll.findOneAndUpdate({_id: pollId, 'options.name': vote.voteVal}, {
      $inc: {
        totalVotes: -1,
        'options.$.votes': -1
      }
    }, {
      new: true
    }).exec(function (err, poll) {
      if (err) return console.log(err);
      cb(poll);
    });
  });
};

exports.getVotes = function (user, cb) {
  const userId = (typeof user === 'object') ? user._id : user;

  Vote.find({userID: userId}, 'pollID -_id')
    .exec(function (err, votes) {
      if (err) return console.log(err);

      cb(votes);
    });
};
