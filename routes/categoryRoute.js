const express=require('express');
const {getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator}= require ('../utils/validators/categoryValidators');

const{getCategories ,
    createCategories,
    updateCategory,
     getCategory,
     deleteCategory,
     uploadBrandImage,
     resizeImage}=require('../services/categoryService');

const router=express.Router();
const subCategoryRoute= require('./subCategoryRoute');

router.use('/:categoryId/subcategories',subCategoryRoute);


router.route('/').get(getCategories)
router.route('/').post(uploadBrandImage,resizeImage,createCategoryValidator,createCategories);
// first add rules then the middleware to catch error then if there is no error in the request it will pass to getCategory Service 
router.route('/:id').get(getCategoryValidator,getCategory);
router.route('/:id').put(uploadBrandImage,
    resizeImage,updateCategoryValidator,updateCategory).delete(deleteCategoryValidator,deleteCategory);





module.exports=router;