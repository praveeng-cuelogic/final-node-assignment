const db = require('../config/db');
const UserActivity = db.UserActivity;

async function createUserActivity(req, userId) {
    let ua = req.get('User-Agent');
    let ip = req.ip;
    if (!ip) throw 'IP address not found';
    if (!ua) throw 'User-Agent not found';
    if (ip && ua) {
        let activity = new UserActivity({
            ip: ip,
            userAgent: ua,
            user: userId,
            //loggedInDate: new Date 
            //comment: (comment ? comment : "")
        })

        console.log(activity);

        activity.save()
            .then(doc => {
                console.log(doc)
            })
            .catch(err => {
                console.error(err)
            })
    }
}

module.exports = createUserActivity;