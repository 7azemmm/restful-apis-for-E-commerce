const categoryModel= require('../models/categoryModel');


exports.getCategories=(req,res)=>{

    const name=req.body.name;
    console.log(req.body);
    
    const newcategory= new categoryModel({name});
    newcategory.save().then((doc)=>{
        res.json(doc);
    })
    .catch((err)=>{
        res.json(err); // callback function for the error and can be readable as a response
    });
};