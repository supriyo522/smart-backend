const cron = require('node-cron');
const Task = require('./models/Task');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey("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");

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const soon = new Date(now.getTime() + 5 * 60000);

  const tasks = await Task.find({
    reminder: true,
    reminderTime: { $lte: soon, $gte: now }
  }).populate('user');

  for (const task of tasks) {
    const msg = {
      to: task.user.email,
      from: "backend@houseofmusa.com", // Must be verified sender
      subject: `Reminder: ${task.title}`,
      text: `Your task "${task.description}" is starting soon at ${task.startTime}.`,
    };

    try {
      await sgMail.send(msg);
      console.log(`Reminder sent to ${task.user.email}`);
    } catch (error) {
      console.error('SendGrid Error:', error.response?.body || error.message);
    }
  }
});
