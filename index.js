const {sequelize, DataTypes, Model} = require('./db');
    
class Restaurant extends Model {}
class Menu extends Model{}

Restaurant.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

Menu.init({
    course: DataTypes.STRING,
    item: DataTypes.STRING,
},{
    sequelize,
    timestamps: false,
});

Menu.belongsTo(Restaurant)
Restaurant.hasMany(Menu)

module.exports = {Restaurant,Menu}