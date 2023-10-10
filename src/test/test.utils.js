const db      = require('../models');
const bycript = require('bcryptjs');

const User = db.user;

const removeTestUser = async () => {
    return User.destroy({
        where:{
            name:'test'
        }
    });
};

const createTestUser = async () => {
   return User.create({
        name:'test',
        phone:'081281529300',
        email:'test@gmail.com',
        password: bycript.hashSync('test', 8),
    }).then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}


const getTestUser = async () => {
    return User.findOne({
        where:{
            email:'test@gmail.com'
        }
    });
}

const removeAllTestAccounts = async () => {
    return User.destroy({
        where:{
            name:'test'
        }
    });
}

module.exports = {
    removeTestUser,
    getTestUser,
    createTestUser,
    removeAllTestAccounts
};