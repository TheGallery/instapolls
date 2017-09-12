const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  userType: {type: String, enum: ['registered', 'guest']},
  userID: String,
  pollID: {type: mongoose.Schema.Types.ObjectId, ref: 'Poll'},
  voteVal: String
});

mongoose.model('Vote', VoteSchema);
