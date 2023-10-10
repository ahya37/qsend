const db = require('../config/database');
const user = require('./user.model');
const categories = require('./category.model');
const products = require('./product.model');
const image = require('./image.model');
const sender = require('./sender.model');
const saldo  = require('./saldo.model');
const ledger = require('./ledger.model');

db.user     = (user)(db.sequelize, db.Sequelize);
db.category = (categories)(db.sequelize, db.Sequelize);
db.product  = (products)(db.sequelize, db.Sequelize);
db.image    = (image)(db.sequelize, db.Sequelize);
db.sender   = (sender)(db.sequelize, db.Sequelize);
db.saldo    = (saldo)(db.sequelize, db.Sequelize);
db.ledger   = (ledger)(db.sequelize, db.Sequelize);

db.product.hasMany(db.image, {
    foreignKey: 'product_id'
});

db.category.hasMany(db.product,  {
    foreignKey: 'category_id'
});

db.user.hasMany(db.product, {
    foreignKey: 'user_id'
});

db.product.belongsTo(db.user,{
    foreignKey: 'user_id'
});

db.user.hasMany(db.sender, {
    foreignKey: 'user_id'
});

db.user.hasMany(db.saldo, {
    foreignKey: 'user_id'
});

db.user.hasMany(db.ledger, {
    foreignKey: 'user_id'
});

module.exports = db;