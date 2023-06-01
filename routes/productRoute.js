const express=require('express');
const {getProductValidator,
    updateProductValidator,
    createProductValidator,
    deleteProductValidator}= require ('../utils/validators/productValidator');

const{getProducts,
    createProduct,
    updateProduct,
     getProduct,
     deleteProduct}=require('../services/productService');

const router=express.Router();


router.route('/').get(getProducts);
router.route('/').post(createProductValidator,createProduct);
// first add rules then the middleware to catch error then if there is no error in the request it will pass to getCategory Service 
router.route('/:id').get(getProductValidator,getProduct);
router.route('/:id').put(updateProductValidator,updateProduct).delete(deleteProductValidator,deleteProduct);





module.exports=router;