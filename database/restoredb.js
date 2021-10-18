const {spawn} = require('child_process');
const path = require('path');
const config = require('../config/index');
//const cron = require('node-cron');

const DB_NAME = config.dbName;

const dir = './database/backup';
const ARCHIVE_PATH = path.join(dir, `${DB_NAME}.gzip`);
restoreMongoDB();

//cron.schedule('*/10 * * * * *', () => restoreMongoDB());

function restoreMongoDB() {
    const child = spawn('mongorestore', [
        `--db=${DB_NAME}`,
        `--archive=${ARCHIVE_PATH}`,
        '--gzip',
    ]);

    child.stdout.on('data', (data) => {
        console.log('stdout:\n', data);
    });
    child.stderr.on('data', (data) => {
        console.log('stderr:\n', Buffer.from(data).toString());
    });
    child.on('error', (error) => {
        console.log('error:\n', error);
    });
    child.on('exit', (code, signal) => {
        if (code) console.log('Process exit with code:', code);
        else if (signal) console.log('Process killed with signal:', signal);
        else console.log('Data restore successfully ');
    });
}