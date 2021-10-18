const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');
const config = require('../config/index');

//const cron = require('node-cron');

const DB_NAME = config.dbName;

const dir = './database/';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
        recursive: true
    });
}

const ARCHIVE_PATH = path.join(dir, `${DB_NAME}.gzip`);
backupMongoDB();

//cron.schedule('*/10 * * * * *', () => backupMongoDB());

function backupMongoDB() {
    const child = spawn('mongodump', [
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
        else console.log('Backup is successfully ');
    });
}