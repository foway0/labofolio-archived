const sequelize = require('sequelize');
const Sequelize = sequelize.Sequelize;

const TABLE_NAME = 'test2';

module.exports = (sequelize) => {
    return sequelize.define(TABLE_NAME,
        {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            }
        },
        {
            timestamps: true,
            underscored: true,
            charset: 'utf8',
            freezeTableName: true,
        });
};