module.exports = (sequelize, Sequelize) => {
    const Ledger = sequelize.define('Ledger', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type_balance : {
            type: Sequelize.ENUM('C','D'),
            allowNull: false
        },
        amount : {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        balance : {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        last_balance : {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        status : {
            type: Sequelize.STRING,
            default:'Z',
            allowNull: false
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    });

    return Ledger;
};