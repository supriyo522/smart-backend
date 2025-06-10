const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  isFlexible: Boolean,
  constraints: [String],
  status: { type: String, enum: ['pending', 'scheduled', 'conflict', 'completed'], default: 'pending' },
  reminder: Boolean,
  reminderTime: Date,
  calendar: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);
