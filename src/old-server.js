const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { initialGenerateQrCode } = require('./services/runsessionwa');

const __basedir = path.resolve();

const app = express();
dotenv.config();

let whitelist = ['http://localhost:8000'];

let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static('storage'));
app.use('/img', express.static(__basedir + '/storage/upload'));

// const db = require('./models');
// const { logger } = require('./util/logging');
// const seed = require('./models/seeds')


// db.sequelize
//     // .sync({force: true})
//     .sync()
//     .then(() => {
//         // seed.userSeed();
//         // seed.categorySeed();
//         // console.log('database connected');
//     })
//     .catch((err) => {
//         // console.error('database connection failed', err.message);
//     });

app.get('/', (req, res) => {
    res.json({
        message: 'server is running',
    });
});

require('./routes/auth.route')(app);
require('./routes/profile.route')(app);
require('./routes/product.route')(app);
require('./routes/upload.route')(app);
require('./routes/ads.route')(app);
require('./routes/sender.route')(app);
require('./routes/saldo.route')(app);
// run session wa

async function getInitRunSessionWa () {
   
    try {
        const results = await initialGenerateQrCode();
        console.log('results', results);
        return results;

    } catch (error) {
        console.log('error', error);
    }
}
getInitRunSessionWa();
const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});
