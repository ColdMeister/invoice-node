const Sequelize = require('sequelize');
var sequelize = require('./database');
//import Role for FK roleId

var InvoiceDetails = require('./InvoiceDetails');

//nametable
var nametable = 'invoice';

var Invoice = sequelize.define(nametable,{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true

	},
	invoice_name: Sequelize.STRING,
	company_name: Sequelize.STRING,
	address: Sequelize.STRING,
	phone: Sequelize.BIGINT,
  total: Sequelize.FLOAT

  });


//nvoiceDetails.hasMany(Invoice);
//Invoice.belongsTo(InvoiceDetails);

Invoice.hasMany(InvoiceDetails, { as: "InvoiceDetails" });
InvoiceDetails.belongsTo(Invoice,{
  foreignKey: "invoiceId",
  as: "Invoice"
});


module.exports = Invoice;
