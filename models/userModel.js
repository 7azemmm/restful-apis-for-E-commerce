const mongoose = require('mongoose');

const bcrypt =require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name required'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,

    password: {
      type: String,
      required: [true, 'password required'],
      minlength: [6, 'Too short password'],
    },
    
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user',
    },
    /*active:{
     type:Boolean,
     default:true,

    },*/
    // we will check this tomorrow 
   
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next){
if(!this.isModified('password')) return next(); // if this password does not occur any change as no pasword send from request so  do not enter the encryption process
this.password=await bcrypt.hash(this.password,12);  // as this function returns a promise we use async await 

next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;