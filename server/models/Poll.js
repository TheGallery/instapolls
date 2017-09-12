const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalVotes: { type: Number, default: 0 },
  options: [{
    name: String,
    votes: {type: Number, default: 0}
  }]
});

mongoose.model('Poll', PollSchema);
