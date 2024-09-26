const logging = (req,res, next)=>{
    console.log(`${req.method} ${req.protocol}://${req.headers.host}${req.url}`);
    next();
}

export default logging;