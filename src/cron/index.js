const cron = require('node-cron');
const { DeviceGroup } = require('../models');
const { pushToGroupQueue } = require('../controllers/queueController');

// Function to be executed at 6 AM daily
async function dailySchedulePush() {
    console.log('func called')
    const groups = await DeviceGroup.findAll({attributes:['group_id']})

    const groupIds = groups.map(grp=>grp.group_id);

    await pushToGroupQueue(groupIds);
}

// Schedule the task to run every day at 6 AM
cron.schedule('05 21 * * *', async() => {
    await dailySchedulePush();
    console.log('cron called')

}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // India timezone
});

