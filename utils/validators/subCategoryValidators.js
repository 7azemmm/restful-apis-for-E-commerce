const {check}=require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware');


exports.getsubCategoryValidator=[


    // rules 
    check('id').notEmpty().withMessage("need a specific id first")
    .isMongoId().withMessage(`invalid subCategory id format`),
    // check errors in rules 
    validatorMiddleware,
    
];

exports.createsubCategoryValidator=[

    check('name').notEmpty()
    .withMessage('must write a subCategory name')
    .isString()
    .withMessage('subCategory name must be a string')
    .isLength({min:3})
    .withMessage('subCategory name must be more than 3 characters')
    .isLength({max:32})
    .withMessage('subCategory name must be less than 32 characters'),
    check('category').notEmpty().withMessage('subCategory must be belong to Category')
    .isMongoId().withMessage(`invalid subCategory id format`),

    validatorMiddleware,

];


/*exports.deletesubCategoryValidator=[
    // rules 
    check('id').isMongoId().withMessage(`invalid subCategory id format`),
    // check errors in rules 
    validatorMiddleware,

    

];
exports.updatesubCategoryValidator=[
    // rules 
    check('id').isMongoId().withMessage(`invalid subCategory id format`),
    // check errors in rules 
    validatorMiddleware,

];*/
