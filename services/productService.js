const asyncHandler = require('express-async-handler');
const slugify=require('slugify');
const Product= require('../models/productModel');


const ApiError=require('../utils/apiError');


// @desc   get list of products
// @route  GET /api/v1/products
//@access  public
exports.getProducts=asyncHandler(async(req,res)=>{
     
    //pagination
    const page= req.query.page*1 || 1; // to get the value of the page query parameter from the request URL. If the page query parameter is present in the URL, it will be multiplied by 1 to convert it to a number.
    const limit=req.query.limit*1 || 5;
    const skip=(page-1)*limit;
    const products= await Product.find({}).skip(skip).limit(limit); // attach pagination
    res.status(200).json({results: products.length,page, data: products});
    
});

 //@desc   get specific product by id
 //@route  GET /api/v1/products/:id
 //@access public
 exports.getProduct=asyncHandler(async(req,res,next)=>{

    const{id}=req.params;
    const product=await Product.findById(id);
    if(!product){
       
       return next( new ApiError(`no product found for this id: ${id}`, 404))
    }
    res.status(200).json({data:product});
 
 });


//@desc update specific  product
//@route  PUT /api/v1/products/:id    
//@access  private
    exports.updateProduct=asyncHandler(async(req,res,next)=>{

        const {id}=req.params;
        req.body.slug=slugify(req.body.title);
     
        const product= await Product.findOneAndUpdate(
         {_id:id},
         req.body,
         {new:true}  // to return product after making an update
         );
         if(!product){
           
            return next( new ApiError(`no product found for this id: ${id}`,404));


         }
         res.status(200).json({data:product});
     
     
     
     
         });







// @desc   create product
// @route  POST /api/v1/products
//@access  private
exports.createProduct= asyncHandler(async(req,res)=>{
    req.body.slug=slugify(req.body.title); // slug in the body 
    

  
    const product= await Product.create(req.body);  //req.body is an object 
    res.status(201).json({ data: product});

   

 

});

//@desc delete specific product
//@route  DELETE /api/v1/products/:id    
//@access  private
    exports.deleteProduct=asyncHandler(async(req,res,next)=>{

        const {id}=req.params;
        
        const product= await Product.findByIdAndDelete(id);
        if(!product){
          // res.status(404).json({msg:`no product found for this id ${id}`});
           return next( new ApiError(`no product found for this id : ${id}`,404));
        }
        res.status(204).send(); // 204 status code means that no contet as the item deleted succefully
       
       
       });