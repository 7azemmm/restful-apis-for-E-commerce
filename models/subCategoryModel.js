const mongoose= require('mongoose');


const subCategory= new mongoose.Schema({

name:{
    type:String,
    trim:true,
    unique:[true,'subCategory must be unique'],
    minlength:[2 , 'too short subCategory name '],
    maxlength:[32 , 'too long subCategory name'],

},
slug:{
  type:String,
  lowercase:true,
},

category:{
    type: mongoose.Schema.ObjectId,
    ref:'categoryModel',
    required:[true," subCategory must be belong to parent category"]

},


},
    
    
{timestamps: true});

const subcategoryModel= mongoose.model('subcategoryModel',subcategory);

moudule.exports=subcategoryModel;