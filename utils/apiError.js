//@desc  this class is responsible about my predicatble errors

class ApiError extends Error{ // extends general class error
    constructor(message, statusCode){
      super(message);
      this.statusCode=statusCode;
      this.statusCode= `${statusCode}`.startsWith(4)? "Fail": "Error"; // check if it is a fail or error 
      this.isOperational=true;
    }
}
module.exports=ApiError;