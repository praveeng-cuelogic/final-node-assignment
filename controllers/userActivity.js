const db = require('config/db');
const UserActivity = db.UserActivity;

function createUserActivity(req, userId, comment) {
    let ua = req.get('User-Agent');
    let ip = req.ip;
    if (!ip) throw 'IP address not found';
    if (!ua) throw 'User-Agent not found';
    if (ip && ua) {
        let activity = new UserActivity({
            ip: ip,
            ua: ua,
            userid: userId,
            comment: (comment ? comment : "")
        })
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