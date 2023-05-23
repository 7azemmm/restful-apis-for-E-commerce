const express=require('express');

const{getCategories ,createCategories}=require('../services/categoryService')

const router=express.Router();


router.route('/').get(getCategories).post(createCategories);



module.exports=router;