const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  provider: String,
  providerId: String
});

mongoose.model('User', UserSchema);
