/*const express = require ('express')

const{createsubCategoryValidator,getsubCategoryValidator}=require('../utils/validators/subCategoryValidators');


const{createSubCategory,
    getsubCategory,
    getsubCategories
}=require('../services/subCategoryService');


const router=express.Router();


router.route('/').post(createsubCategoryValidator,createSubCategory)//.get(getsubCategories)
router.route('/').get(getsubCategories);
//router.route('/:id').get(getsubCategoryValidator,getsubCategory);



module.exports=router;*/

const express = require('express');

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require('../services/subCategoryService');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidators');

// mergeParams: Allow us to access parameters on other routers (nested route)
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObj, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;