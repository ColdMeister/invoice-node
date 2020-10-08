const express = require('express');
const cors = require('cors');
const app = express();

// setting port
app.set('port',process.env.POST||3000);

app.use(express.json());

const invoiceRouters = require('./routes/InvoiceRoute');

//Configuration with cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Route
app.use('/invoice',invoiceRouters);

app.use('/', (req,res) => {

	res.send("Hello World from Node.js");
});



// Importing routes



app.listen(app.get('port'),()=>{
	console.log("Starting server Node.js");
});
