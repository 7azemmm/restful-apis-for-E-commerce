
const mongoose=require('mongoose');
//create schema
const categorySchema= new mongoose.Schema({
    name:{
      type: String,
      required: true,
      unqiue:[true,'category must be unique'],
      minlength:[3 , 'too short category name '],
      maxlength:[32 , 'too long category name'],
  },
   
    // it changes the space with - and changes upperCase to lowerCase as  A and B => a-and-b in the url 
    slug:{
      type:String,
      lowercase:true,
    }
  
    /*image: String,*/

    },{timestamps:true}  // create two fields in this document created at and updated at to help in seeing the newest and oldest categories 
    );
    

    const setImageURL = (doc) => {
      if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
      }
    };
    // findOne, findAll and update
    categorySchema.post('init', (doc) => {
      setImageURL(doc);
    });
    
    // create
    categorySchema.post('save', (doc) => {
      setImageURL(doc);
    });
    // change schema to model
    const categoryModel= mongoose.model('categoryModel',categorySchema);
    

  //export for category model

  module.exports=categoryModel;
