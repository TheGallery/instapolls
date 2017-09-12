const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  provider: String,
  providerId: String,
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }]
});

mongoose.model('User', UserSchema);
