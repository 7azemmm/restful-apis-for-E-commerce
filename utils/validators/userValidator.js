const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.getUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  validatorMiddleware,
];

exports.createUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('User required')
    .isLength({ min: 3 })
    .withMessage('Too short User name')
    
    .custom((val, { req }) => {  // slugify to the name and put it on the body 
      req.body.slug = slugify(val);
      return true;
    }),
    
    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {  // check the mail if it is correct or not 
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),

 
    check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),

 check("passwordConfirm").notEmpty().withMessage('please confirm the password'),  //check while taking the data

 check('profileImg').optional(),

 check('role').optional(),

 check('phone').optional()
 .isMobilePhone(['ar-EG','ar-SA'])
 .withMessage('invalid phone number only accept EG and SA phone numbers'), // giving a local phone numbers to check it by isMobilePhone function
  
 validatorMiddleware,
];

exports.updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validatorMiddleware,
];

exports.deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),

  validatorMiddleware,
];