const Sequelize =  require('sequelize');
var sequelize = require('./database');

var Invoice = require('./Invoice');

var nametable = 'invoice_details'; // tablename

var InvoiceDetails = sequelize.define(nametable,{
	item_id: Sequelize.STRING,
  item_name: Sequelize.STRING,
  quantity: Sequelize.INTEGER,
  amount: Sequelize.FLOAT

},
{

	//timestamp
	timestamps:false
});



module.exports = InvoiceDetails;
