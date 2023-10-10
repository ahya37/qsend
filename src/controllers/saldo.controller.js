const db = require('../models');
// const { logger } = require('../util/logging');

const Saldo  = db.saldo;
// const Ledger = db.ledger;

exports.create =  (req, res) => {

    if(!req.body.amount) {
        res.status(400).json({
            message: 'amount must be required!'
        });
        return;
    }

    // save to table ledger
    // const requestLeder = {
    //     user_id: req.userId,
    //     amount: req.body.amount,
    //     createdBy: req.userId,
    // };

    // kalkulasikan saldo terakhir dan
    
    // save to table saldo
    const requestSaldo = {
        user_id: req.userId,
        balance: req.body.amount,
        last_balance: req.body.amount,
        createdBy: req.userId, 
    };

    Saldo.create(requestSaldo).then((result) => {
        res.status(200).json({
            data: result,
            message: 'saldo create successfully!'
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        });
    });

};