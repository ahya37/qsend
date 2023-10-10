module.exports = (sequelize, Sequelize) => {
    const Saldo = sequelize.define('saldos', {
        user_id: {
            type: Sequelize.INTEGER,
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
            allowNull: false,
            defaultValue: 'Z'
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

    return Saldo;
};