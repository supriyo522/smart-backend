const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sharedWith: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    permission: { type: String, enum: ['read', 'write'], default: 'read' }
  }]
});

module.exports = mongoose.model('Calendar', calendarSchema);
