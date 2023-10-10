module.exports = (sequelize, Sequelize) => {
    const Sender = sequelize.define('senders', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        phoneNumber : {
            type: Sequelize.STRING,
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

    return Sender;
};