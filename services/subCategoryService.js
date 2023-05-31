const asyncHandler = require('express-async-handler');
const slugify=require('slugify');
const subCategoryModel= require('../models/subCategoryModel');


const ApiError=require('../utils/apiError');

/*
// @desc   get list of categories
// @route  GET /api/v1/categories
//@access  public
exports.getSubCategories=asyncHandler(async(req,res)=>{
     
    //pagination
    const page= req.query.page*1 || 1; // to get the value of the page query parameter from the request URL. If the page query parameter is present in the URL, it will be multiplied by 1 to convert it to a number.
    const limit=req.query.limit*1 || 5;
    const skip=(page-1)*limit;
    const subCategories= await subCategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({results: subCategories.length,page, data: subCategories});
    
});*/

/*
//@desc update specific category 
//@route  PUT /api/v1/categories/:id    
//@access  private
    exports.updateSubCategory=asyncHandler(async(req,res,next)=>{

        const {id}=req.params;
        const {name}=req.body;
     
        const subCategory= await subCategoryModel.findOneAndUpdate(
         {_id:id},
         {name},
         {new:true}  // to return category after making an update
         );
         if(!subCategory){
           
            return next( new ApiError(`no subCategory found for this id: ${id}`,404));


         }
         res.status(200).json({data:subCategory});
     
     
     
     
         });*/



/*

 //@desc   get specific category by id
 //@route  GET /api/v1/categories/:id
 //@access public
 exports.getSubCategory=asyncHandler(async(req,res,next)=>{

    const{id}=req.params;
    const subCategory=await subCategoryModel.findById(id);
    if(!subCategory){
       
       return next( new ApiError(`no subCategory found for this id: ${id}`, 404))
    }
    res.status(200).json({data:subCategory});
 
 });*/

// @desc   create category
// @route  POST /api/v1/categories
//@access  private

exports.createSubCategory= asyncHandler(async(req,res)=>{
    const {name,category}= req.body;
    
   
  
    const subCategory= await subCategoryModel.create({name , slug:slugify(name),category});
    res.status(201).json({ data: subCategory});

});

/*
 //@desc delete specific category 
    //@route  DELETE /api/v1/categories/:id    
    //@access  private
    exports.deleteSubCategory=asyncHandler(async(req,res,next)=>{

        const {id}=req.params;
        
        const subCategory= await subCategoryModel.findByIdAndDelete(id);
        if(!subCategory){
          // res.status(404).json({msg:`no category found for this id ${id}`});
           return next( new ApiError(`no subCategory found for this id : ${id}`,404));
        }
        res.status(204).send(); // 204 status code means that no contet as the item deleted succefully
       
       
    });*/

