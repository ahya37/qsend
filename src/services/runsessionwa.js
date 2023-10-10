const { Client, LocalAuth } = require('../../index.js');
const fs = require('fs/promises');
const path = require('path');

const __basedir = path.resolve();

// set session file
const filePath = __basedir + '/src/storage/';
const fileName = 'whatsapp-session.json';
const SESSION_FILE = `${filePath}/${fileName}`;
// get session file
let sessionExists = [];
const getSessionFile = async () => {
    const readFiles = await fs.readFile(SESSION_FILE);
    console.log(JSON.parse(readFiles.toString()));
    return JSON.parse(readFiles.toString());
};

const runSessionWa = async (id) => {
    return new Promise((resolve) => {


        // eslint-disable-next-line no-unused-vars
        const client = new Client({
            // proxyAuthentication: { username: 'username', password: 'password' },
            puppeteer: {
                // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
                headless: true,
            },
    
            authStrategy: new LocalAuth({
                clientId: id,
            }),
        });
    
        client.on('qr', async (qr) => {
            // console.log(qr);
        });
    
        client.on('loading_screen', async (percent, message) => {
            console.log(id + ' LOADING SCREEN', percent, message);
        });
    
        client.on('authenticated', async () => {
            console.log(id + ' AUTHENTICATED');
        });
    
        client.on('auth_failure', async (msg) => {
            // Fired if session restore was unsuccessful
            console.error(id + ' AUTHENTICATION FAILURE', msg);
        });
    
        client.on('ready', async () => {
            console.log(id + ' READY');
        });
    
        client.initialize();
    
        // tambahkan client ke session
        sessionExists.push({
            id: id,
            client: client,
        });

        resolve(sessionExists);
    
    });

};

const initialGenerateQrCode = async () => {

    const savedSessions = await getSessionFile();

    // let resultSession = [];
    for (let i = 0; i < savedSessions.length; i++) {
        await runSessionWa(savedSessions[i].id);
        // resultSession.push(client);
    }
    return;
    // return resultSession;
};
initialGenerateQrCode();
module.exports = {
    initialGenerateQrCode,
    runSessionWa,
    sessionExists,
};
