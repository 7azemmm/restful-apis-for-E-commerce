const express = require ('express')

const{createsubCategoryValidator,getsubCategoryValidator
    
}=require('../utils/validators/subCategoryValidators');


const{createSubCategory,
    getsubCategory,
    getsubCategories}=require('../services/subCategoryService');


const router=express.Router();


router.route('/').post(createsubCategoryValidator,createSubCategory)//.get(getsubCategories)
//router.route('/').get(getsubCategories);
//router.route('/:id').get(getsubCategoryValidator,getsubCategory);



module.exports=router;