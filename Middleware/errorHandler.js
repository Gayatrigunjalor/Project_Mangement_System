const errorhandler = (err, req, res, next) => {
    if(!err.status){
        return res.status(500).json({message:"Internal Server Error"});
    }
    res.status(err.status).json({message: err.message});
    next();
  };
export default errorhandler;