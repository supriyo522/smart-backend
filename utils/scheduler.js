const Task = require('../models/Task');

exports.autoScheduleTasks = async (userId) => {
  const tasks = await Task.find({ user: userId, status: 'pending' });

  let scheduled = [];
  let conflicts = [];

  tasks.forEach(task => {
    const canSchedule = !task.constraints.includes('weekends') && task.priority !== 'low';

    if (canSchedule) {
      task.startTime = new Date(Date.now() + 3600000);
      task.endTime = new Date(task.startTime.getTime() + task.duration * 60000);
      task.status = 'scheduled';
      scheduled.push(task);
    } else {
      task.status = 'conflict';
      conflicts.push(task);
    }

    task.save();
  });

  return { scheduled, conflicts };
};
