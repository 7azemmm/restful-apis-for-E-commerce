const asyncHandler = require('express-async-handler');
const slugify=require('slugify');
const categoryModel= require('../models/categoryModel');


const ApiError=require('../utils/apiError');


// @desc   get list of categories
// @route  GET /api/v1/categories
//@access  public
exports.getCategories=asyncHandler(async(req,res)=>{
     
    //pagination
    const page= req.query.page*1 || 1; // to get the value of the page query parameter from the request URL. If the page query parameter is present in the URL, it will be multiplied by 1 to convert it to a number.
    const limit=req.query.limit*1 || 5;
    const skip=(page-1)*limit;
    const categories= await categoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({results: categories.length,page, data: categories});
    
});


//@desc update specific category 
//@route  PUT /api/v1/categories/:id    
//@access  private
    exports.updateCategory=asyncHandler(async(req,res,next)=>{

        const {id}=req.params;
        const {name}=req.body;
     
        const category= await categoryModel.findOneAndUpdate(
         {_id:id},
         {name},
         {new:true}  // to return category after making an update
         );
         if(!category){
           
            return next( new ApiError(`no category found for this id: ${id}`,404));


         }
         res.status(200).json({data:category});
     
     
     
     
         });





 //@desc   get specific category by id
 //@route  GET /api/v1/categories/:id
 //@access public
 exports.getCategory=asyncHandler(async(req,res,next)=>{

    const{id}=req.params;
    const category=await categoryModel.findById(id);
    if(!category){
       
       return next( new ApiError(`no category found for this id: ${id}`, 404))
    }
    res.status(200).json({data:category});
 
 });

// @desc   create category
// @route  POST /api/v1/categories
//@access  private
exports.createCategories= asyncHandler(async(req,res)=>{
    const {name}= req.body;
    

  
    const category= await categoryModel.create({name });
    res.status(201).json({ data: category});

   

 

});

 //@desc delete specific category 
    //@route  DELETE /api/v1/categories/:id    
    //@access  private
    exports.deleteCategory=asyncHandler(async(req,res,next)=>{

        const {id}=req.params;
        
        const category= await categoryModel.findByIdAndDelete(id);
        if(!category){
          // res.status(404).json({msg:`no category found for this id ${id}`});
           return next( new ApiError(`no category found for this id : ${id}`,404));
        }
        res.status(204).send(); // 204 status code means that no contet as the item deleted succefully
       
       
       });

