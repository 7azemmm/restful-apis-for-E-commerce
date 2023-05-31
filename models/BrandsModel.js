
const mongoose=require('mongoose');
//create schema
const Brands= new mongoose.Schema({
    name:{
      type: String,
      required: true,
      unqiue:[true,'Brand must be unique'],
      minlength:[3 , 'too short Brand name '],
      maxlength:[32 , 'too long Brands name'],
  },
   
    slug:{
        type:String,
        lowercase:true,
      },
  
    image: String,

    },{timestamps:true} 
    );
    
    // change schema to model
    const BrandsModel= mongoose.model('BrandsModel',Brands);
    

  //export for Brands model

  module.exports=BrandsModel;
