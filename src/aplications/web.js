const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { initialGenerateQrCode } = require('../services/runsessionwa');


const app = express();
dotenv.config();

// let whitelist = ['http://localhost:8000'];

// let corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
// };

// app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({
        message: 'server is running',
    });
});

require('../routes/auth.route')(app);
require('../routes/profile.route')(app);
require('../routes/product.route')(app);
require('../routes/upload.route')(app);
require('../routes/ads.route')(app);
require('../routes/sender.route')(app);
require('../routes/saldo.route')(app);

module.exports = app;