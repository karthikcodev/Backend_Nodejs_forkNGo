const vendorController=require('../controllers/vendorController')
const express=require('express');

const router=express.Router(); //inbuilt method in router

router.post('/register',vendorController.vendorRegister);

router.post('/login',vendorController.vendorLogin)

router.get('/all-vendors',vendorController.getAllvendors)

router.get('/single-vendor/:id',vendorController.getvendorById)

module.exports=router;