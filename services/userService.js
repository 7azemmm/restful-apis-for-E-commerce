const asyncHandler = require('express-async-handler');

const { v4: uuidv4 } = require('uuid');

const sharp=require('sharp');

const bcrypt=require('bcryptjs');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const User = require('../models/userModel');
const ApiError=require('../utils/apiError');

// Upload single image
exports.uploadUserImage = uploadSingleImage('profileImg');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file){  // if photo found 
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/user/${filename}`);

  // Save image into our db 
   req.body.image = filename;

  } // else 
  next();
});


// @desc    Get list of users
// @route   GET /api/v1/user
// @access  private
exports.getUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/user/:id
// @access  private
exports.getUser = factory.getOne(User);

// @desc    Create User
// @route   POST  /api/v1/user
// @access  Private
exports.createUser = factory.createOne(User);

/// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

//@desc   hashing password by bcrypt
//@route  
//@access   

exports.changeUserPassword=asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password,12),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
// @desc    Delete specific user
// @route   DELETE /api/v1/user/:id
// @access  Private
exports.deleteUser = factory.deleteOne(User);