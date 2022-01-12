const {Sequelize, DataTypes, Model} = require('sequelize');
const sqlite3 = require('sqlite3');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './restaurants.sqlite',
    logging: false
})

module.exports = {sequelize, DataTypes, Model};