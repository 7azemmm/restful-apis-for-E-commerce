const express=require('express');

const{getCategories ,createCategories,updateCategory, getCategory,deleteCategory}=require('../services/categoryService')

const router=express.Router();


router.route('/').get(getCategories).post(createCategories);
router.route('/:id').get(getCategory);
router.route('/:id').put(updateCategory).delete(deleteCategory);

/*router.post('/', (req,res) => {
    createCategories(req,res);
})*/



module.exports=router;