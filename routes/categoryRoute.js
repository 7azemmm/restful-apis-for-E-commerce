const express=require('express');
const {param, validationResult}=require('express-validator');
const{getCategories ,createCategories,updateCategory, getCategory,deleteCategory}=require('../services/categoryService')

const router=express.Router();


router.route('/').get(getCategories).post(createCategories);
// first add rules then the middleware to catch error then if there is no error in the request it will pass to getCategory Service 
router.route('/:id').get(param('id').isMongoId().withMessage(`invalid category id`),(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    },getCategory);
router.route('/:id').put(updateCategory).delete(deleteCategory);

/*router.post('/', (req,res) => {
    createCategories(req,res);
})*/



module.exports=router;