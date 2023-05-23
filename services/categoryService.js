const categoryModel= require('../models/categoryModel');
const slugify=require('slugify');

exports.getCategories=(req,res)=>{

   
    //const name=req.body.name;
    //const newcategory= new categoryModel({name});
    res.send();
    
};

exports.createCategories=(req,res)=>{
    const name=req.body.name;
    categoryModel.create({ name , slug:slugify(name)})

    .then((category) => res.status(201).json({data: category}))

    .catch((err) => res.status(400).send(err));

   /* const name=req.body.name;
    const newcategory= new categoryModel({name});
    newcategory.save().then((doc)=>{
        res.json(doc);
    })
    .catch((err)=>{
        res.json(err); // callback function for the error and can be readable as a response
    });*/

};

