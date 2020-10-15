const controller = {}

//import model and sequelize
var sequelize = require('../model/database');
var Invoice = require('../model/Invoice');
var InvoiceDetails = require('../model/InvoiceDetails');

//migrate table
sequelize.sync();


controller.get = async (req,res) => {
  const { id } = req.params;
  const data = await Invoice.findAll({
			include:'InvoiceDetails',
      where: { id: id }
  });

	if (data === null) {
	  console.log('Not found!');
	} else {
	  res.json({success:true,data:data});
	}
}

controller.list = async(req,res) => {
	const data = await Invoice.findAll({include:'InvoiceDetails'});
	if (data === null) {
	  console.log('Not found!');
	} else {
	  res.json({success:true,data:data});
	}
}

controller.create = async(req,res) => {
	// data
	const{invoice_name, company_name, address, phone, total, itemdetails} = req.body;

	// create
  var itemdsync = [];
	const data = await Invoice.create({
		invoice_name:invoice_name,
		company_name:company_name,
		address:address,
		phone:phone,
		total:total
	}).then(function(data){

    var result = itemdetails.map(function(el) {
        var o = Object.assign({}, el);
        o.invoiceId = data.id;
        return o;
    });
    InvoiceDetails.bulkCreate(result);
  });

  if (data === null) {
  	  console.log('Not found!');
  }else{
    res.status(200).json({
      success:true,
      //message:"Saving is Success",
      data:data
    })
  }

}

controller.update = async (req,res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const{invoice_name, company_name, address, phone, total, itemdetails} = req.body;
  // Update data
  const data = await Invoice.update({
    invoice_name:invoice_name,
		company_name:company_name,
		address:address,
		phone:phone,
		total:total
  },
  {
    where: { id: id}
  })
  .then( function(data){
    const del = InvoiceDetails.destroy({
      where: { invoiceId: id}
    })
  })
  .then(function(data){
    var result = itemdetails.map(function(el) {
        var o = Object.assign({}, el);
        o.invoiceId = id;
        return o;
    });
    InvoiceDetails.bulkCreate(result);
  })

  if (data === null) {
    	  console.log('Not found!');
  }else{
    res.status(200).json({
      success:true,
        //message:"Saving is Success",
      data:data
    })
  }
}

controller.delete = async (req, res) => {
  // parameter post
  const { id } = req.body;
  // delete sequelize
  const del = await InvoiceDetails.destroy({
    where: { invoiceId: id}
  })
  .then(function () {
    Invoice.destroy({
      where: { id: id}
    })
  })
  if (del === null) {
    	  console.log('Not found!');
  }else{
      res.json({
      success:true,
        //message:"Saving is Success",
      deleted:del,
      message:"Deleted successful"
    })
  }

}

controller.testdata = async (req, res) => {

	const response = await sequelize.sync().then(function(){

	 var arr = [];
	 arr.push({item_id:"0001", item_name:"aaa", quantity:2, amount:100, invoiceId: 1});
	 arr.push({item_id:"0002", item_name:"bbb", quantity:2, amount:200, invoiceId: 1});

	  Invoice.create({
			 invoice_name: 'Invoice abukun 1',
			 company_name: 'Globe Telecom',
			 address: 'Lapu Lapu',
			 phone: '1234124',
			 total: 150.00
		 }).then(function(data){
			InvoiceDetails.bulkCreate(arr);
		});

		Invoice.create({
				 invoice_name: 'Invoice lovely 2',
				 company_name: 'Globe Telecom zzzz',
				 address: 'Lapu Lapu',
				 phone: '1234124',
				 total: 300.00
		}).then(function(data){
				 InvoiceDetails.bulkCreate([
					 {
					 item_id: '0003',
					 item_name: 'Toys for aaa',
					 quantity: 1,
					 amount: 150.00,
					 invoiceId: data.id
					 },
					 {
					 item_id: '0004',
					 item_name: 'Toys for bbb',
					 quantity: 2,
					 amount: 150.00,
					 invoiceId: data.id
					 }
				]);
			 });

	})
	.catch(error => {
		return error;
	});

	const data = await Invoice.findAll({include:'InvoiceDetails'});

	res.json({sucess: true, data: data});
}

module.exports = controller;
