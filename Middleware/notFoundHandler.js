const notFoundHandler = (req, res, next) => {
    res.status(404).json({message: 'Router Path Not Found. Please check it.'});
    next();
};

export default notFoundHandler;  