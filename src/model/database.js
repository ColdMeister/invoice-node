var Sequelize = require('sequelize');

const sequelize = new Sequelize(
	'invoice-node', // database
	'root', // user
	'', // password
	{
		host: 'localhost',
		dialect: 'mysql'
	}

);

module.exports = sequelize;
