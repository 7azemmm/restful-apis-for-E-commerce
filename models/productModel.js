const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
      },
      slug: {
        type: String,
        required: true,
        lowercase: true,
      },
      description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [20, 'Too short product description'],
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
      },
      sold: {
        type: Number,
        default: 0, // at starting there is no payment operations on this product
      },
      price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [2000000, 'Too long product price'],
      },
      priceAfterDiscount: {
        type: Number,
      },
      colors: [String],  // colors array of string as product may have more than color 
  ///images/// 

  // @desc these are the images section for the main images and rest of images 
      imageCover: { // cover for all images (main images)
        type: String,
        required: [true, 'Product Image cover is required'], // at least on pic for a product 
      },
      images: [String], // more than on image for a product => rest of images for the product  

   // @desc   refernece section as the product refer to category,brand and subcategory
      category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product must be belong to category'], // reference for category as each product should have a parent category 
      },

      subcategories: [
        // ref to array of sub-category as we can choose more than on sub-category 
        {
          type: mongoose.Schema.ObjectId,
          ref: 'SubCategory',
        },
      ],

      brand: {
        // brand refer to specific brand 
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
      },

      // @desc Rating section for the product

      ratingsAverage: {  // knowing the quality of product 
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
      },
      ratingsQuantity: {
        type: Number,
        default: 0, // as at firt no one rate the product so we keep the default with 0
      },
    
},{timestamps:true});

module.exports= mongoose.model('product',productSchema);