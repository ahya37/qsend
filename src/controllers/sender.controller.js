const { Client, LocalAuth } = require('../../index.js');
const qrcode = require('qrcode-terminal');
const path = require('path');
const fs = require('fs/promises');
const { sessionExists } = require('../services/runsessionwa.js');
const { phoneNumberFormatter } = require('../helpers/formatter.js');
const { logger } = require('../util/logging.js');
const __basedir = path.resolve();

let sessions = [];
// set session file
const filePath = __basedir + '/src/storage/';
const fileName = 'whatsapp-session.json';
const SESSION_FILE = `${filePath}/${fileName}`;

const setSessionFile = async (sessions) => {
    await fs.writeFile(SESSION_FILE, JSON.stringify(sessions), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};

// get session file
const getSessionFile = async () => {
    const readFiles = await fs.readFile(SESSION_FILE);
    return JSON.parse(readFiles);
};

exports.create = async (req, res) => {
    try {
        const id = req.body.whatsappId;

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

        client.on('loading_screen', (percent, message) => {
            console.log('LOADING SCREEN', percent, message);
        });

        client.on('qr', (qr) => {
            // NOTE: This event will not be fired if a session is specified.
            console.log('QR RECEIVED', qr);
            qrcode.generate(qr, { small: true });
            res.status(200).json({
                data: {
                    qrcode: qr,
                },
                message: 'Qrcode generate successfuly!',
            });
        });

        client.on('authenticated', () => {
            console.log('AUTHENTICATED');
        });

        client.on('auth_failure', (msg) => {
            // Fired if session restore was unsuccessful
            console.error('AUTHENTICATION FAILURE', msg);
        });

        client.on('ready', async () => {
            console.log('READY');
            // jika session sudah ready, update session status = true
            const savedSessions = await getSessionFile();
            // console.log('savedSession :', savedSessions);
            const sessionIndex = savedSessions.findIndex(
                (sess) => sess.id == id
            );
            // console.log('sessionIndex :', sessionIndex)
            savedSessions[sessionIndex].ready = true;
            await setSessionFile(savedSessions);
        });

        client.initialize();

        // tambahkan ke session id
        sessions.push({
            id: id,
            client: client,
        });

        // menambahkan session ke file
        const savedSessions = await getSessionFile();
        const sessionIndex = savedSessions.findIndex((sess) => sess.id == id);

        if (sessionIndex === -1) {
            savedSessions.push({
                id: id,
                ready: false,
            });
            await setSessionFile(savedSessions);
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.senMessage = (req, res) => {
    try {
        const sender = req.body.sender;
        const number = phoneNumberFormatter(req.body.number);
        const message = req.body.message;
        // const sessions = sessionExists;
        let waClient = sessionExists.find((sess) => sess.id == sender);
        if (!waClient) {
            waClient = sessions.find((sess) => sess.id == sender).client;
        } else {
            waClient = waClient.client;
        }
        // const client = sessions.find(sess => sess.id == sender).client;
        console.log('sessions', waClient);
        logger.info('waClient');

        // let responses = {};
        // waClient
        //     .sendMessage(number, message)
        //     .then((response) => {
        //         responses.results = response._data.results;
        //         res.status(200).json({
        //             data: responses,
        //         });
        //     })
        //     .catch((error) => {
        //         console.log('error: ', error);
        //         responses.data = error;
        //         res.status(500).json({
        //             data: responses,
        //             message: 'Gagal mengirim pesan!',
        //         });
        //     });
    } catch (error) {
        res.status(500).json({
            data: error,
        });
    }
};
