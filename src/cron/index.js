const cron = require('node-cron');
const { DeviceGroup } = require('../models');
const { pushToGroupQueue } = require('../controllers/queueController');
const {updateUpcomingMatches } = require('../controllers/cricketController');

// Function to be executed at 6 AM daily
async function dailySchedulePush() {
    const groups = await DeviceGroup.findAll({attributes:['group_id']})

    const groupIds = groups.map(grp=>grp.group_id);

    await pushToGroupQueue(groupIds);
}

// Schedule the task to run every day at 6 AM
cron.schedule('00 06 * * *', async() => {
    await dailySchedulePush();

    await updateUpcomingMatches();

}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // India timezone
});

cron.schedule('12 15 * * *', async() => {
    await dailySchedulePush();

    await updateUpcomingMatches();

}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // India timezone
});


// cron.schedule('15 15 * * *', async() => {
//     // await updateUpcomingMatches();
//     await startLiveMatchStreaming();

// }, {
//     scheduled: true,
//     timezone: "Asia/Kolkata" // India timezone
// });

// cron.schedule('15 19 * * *', async() => {
//     // await updateUpcomingMatches();
//     await startLiveMatchStreaming();

// }, {
//     scheduled: true,
//     timezone: "Asia/Kolkata" // India timezone
// });