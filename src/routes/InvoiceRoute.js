const express = require('express');
const router = express.Router();

const InvoiceController = require('../controller/InvoiceController');

router.get('/list',InvoiceController.list);
router.post('/create',InvoiceController.create);
router.get('/get/:id',InvoiceController.get);
// router.post('/update/:id', InvoiceController.update);
// router.post('/delete',InvoiceController.delete);

router.get('/datatest',InvoiceController.testdata);
//router.get('/test',InvoiceController.test);
// router.get('/save', (req,res)=>{
// 	res.json({status:"Employeed saved"});
// });


module.exports = router;
