const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  userType: {type: String, enum: ['registered', 'guest']},
  userId: String,
  pollId: {type: mongoose.Schema.Types.ObjectId, ref: 'Poll'},
  voteVal: String
});

mongoose.model('Vote', VoteSchema);
